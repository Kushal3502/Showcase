import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

function ProjectCard({ project }) {
  return (
    <div className="border border-zinc-800 hover:bg-zinc-800 rounded-lg p-2 h-full flex flex-col ">
      <Link to={`/project/${project._id}`}>
        <AspectRatio ratio={16 / 9} className="rounded-lg mb-2 overflow-hidden">
          <img src={project.thumbnail} className="" />
        </AspectRatio>
        <div className="flex items-between justify-start px-2 lg:gap-4 gap-2">
          <img
            src={project.owner.avatar}
            className=" lg:w-10 lg:h-10 sm:h-10 sm:w-10 w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className=" text-lg">{project.title}</p>
            <p className="text-sm text-gray-400">{project.owner.username}</p>
          </div>
        </div>
        <div className=" flex justify-start gap-4 lg:pl-16 pl-12 mt-2">
          {project.category.map((category) => (
            <Badge variant="secondary">{category}</Badge>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
