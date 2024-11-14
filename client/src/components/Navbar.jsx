import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useAuth from "@/context/authContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { post } from "@/utils/api";

function Navbar() {
  const { githubData, user } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await post("/users/logout");
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className=" flex justify-between md:px-12 md:py-4 p-4 border-b border-b-slate-600">
      <h2 className=" text-3xl">Showcase</h2>
      <ul className=" hidden md:flex items-center gap-12">
        <li className="cursor-pointer hover:text-zinc-300 transition-colors">
          <Link to="/" className="font-medium">
            Home
          </Link>
        </li>
        <li className="cursor-pointer hover:text-zinc-300 transition-colors">
          <Link to="/discuss" className="font-medium">
            Discuss
          </Link>
        </li>
        {user ? (
          <>
            <li className="cursor-pointer hover:text-zinc-300 transition-colors">
              <Link to="/project/add" className="font-medium">
                Add Project
              </Link>
            </li>
            <li className="cursor-pointer hover:text-zinc-300 transition-colors">
              <Link to="/profile" className="font-medium">
                Profile
              </Link>
            </li>
            <li className="cursor-pointer hover:text-zinc-300 transition-colors">
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          </>
        ) : (
          <Button variant="secondary" onClick={() => navigate("/auth/login")}>
            Login
          </Button>
        )}
      </ul>
      <div className=" flex items-center gap-4">
        <p className=" md:block hidden">Welcome, {githubData?.name}</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={githubData?.avatar_url || "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:hidden block m-4 border-gray-400 bg-[#18181B] text-white w-52">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Navbar;
