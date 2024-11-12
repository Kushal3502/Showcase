import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import generateRandomQuote from "@/config/quotes";
import useAuth from "@/context/authContext";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { registerUser } = useAuth();

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const fetchGithubData = async (username) => {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    return response.data;
  };

  const handleRegister = async (data) => {
    setLoader(true);
    try {
      console.log(data);
      const githubData = await fetchGithubData(data.username);

      const registerData = {
        username: data.username,
        avatar: githubData.avatar_url,
        password: data.password,
      };

      const response = await registerUser(registerData);

      if (response) navigate("/auth/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return (
      <div className=" flex flex-col justify-center items-center gap-4">
        <p>{generateRandomQuote()}</p>
        <PropagateLoader color="#ffffff" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md space-y-4 bg-transparent text-white ">
      <CardHeader className="space-y-2 text-left">
        <CardTitle className="text-2xl font-bold">
          Create a new account
        </CardTitle>
        <CardDescription>
          Enter your Github username to get started...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Github username : </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your Github username"
              className=" bg-transparent w-full"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <span className="text-sm text-red-500 mt-1">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password : </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create new password"
              className="bg-transparent w-full"
              {...register("password", {
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long!",
                },
              })}
            />
            {errors.password && (
              <span className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button variant="secondary" className="w-full">
            Register
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-gray-600">
          Already have an account?
          <Link to="/auth/login" className="text-blue-500 underline ml-2">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default Register;
