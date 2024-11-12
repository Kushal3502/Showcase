import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/context/authContext";
import { Github } from "lucide-react";
import React from "react";

function Profile() {
  const { githubData } = useAuth();
  return (
    <div className="flex justify-center p-4 sm:p-8">
      <Card className="bg-transparent text-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-start gap-4 sm:gap-8">
            <img
              src={githubData?.avatar_url}
              alt="Profile"
              className="w-24 h-24 sm:w-36 sm:h-36 rounded-lg mx-auto sm:mx-0"
            />
            <div className=" flex flex-col gap-10">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold flex justify-center sm:justify-start items-center gap-2 sm:gap-4">
                  {githubData?.name}
                  <span className="border rounded-full p-1 sm:p-2">
                    <a
                      href={githubData?.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                    </a>
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-zinc-500">
                  @{githubData?.login}
                </p>
              </div>
              <div className=" flex items-center gap-4 text-zinc-400">
                <h3>Followers : {githubData?.followers}</h3>
                <h3>Followings : {githubData?.following}</h3>
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <p className="text-center sm:text-left">Your content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
