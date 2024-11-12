import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuth from "@/context/authContext";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import generateRandomQuote from "@/config/quotes";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { login, setGithubData } = useAuth();

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const fetchGithubData = async (username) => {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    return response.data;
  };

  const handleLogin = async (data) => {
    setLoader(true);
    try {
      console.log(data);
      const loginData = {
        username: data.username,
        password: data.password,
      };

      const user = await login(loginData);

      if (user) {
        try {
          const userGithub = await fetchGithubData(data.username);
          setGithubData(userGithub);
        } catch (githubError) {
          console.warn("Failed to fetch GitHub data:", githubError);
        }

        navigate("/");
      } else {
        throw new Error("Login failed: No user data received");
      }
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
          Login to your account
        </CardTitle>
        <CardDescription>
          Enter your Github username to get started...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
              className=" bg-transparent w-full"
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
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-gray-600">
          Don't have an account?
          <Link to="/auth/register" className="text-blue-500 underline ml-2">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default Login;
