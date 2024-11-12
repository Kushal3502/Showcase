import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <Card className="bg-transparent text-white hover:bg-zinc-800 hover:cursor-pointer">
      <Link to={`/${project._id}`}>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden">
            <img src={project.thumbnail} className="" />
          </AspectRatio>
        </CardContent>
        <CardFooter className=" flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={project.owner.avatar || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
          </Avatar>
          <p>{project.owner.username}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}

export default ProjectCard;
