import { get } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Github, Pencil, Trash2 } from "lucide-react";
import useAuth from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function ViewProject() {
  const { projectId } = useParams();
  const [project, setProject] = useState();
  const { user } = useAuth();

  const fetchProjectDetails = async (projectId) => {
    const projecDetails = await get(`/projects/${projectId}`);
    console.log(projecDetails);
    setProject(projecDetails.project);
  };

  useEffect(() => {
    fetchProjectDetails(projectId);
  }, [projectId]);

  return (
    <div>
      {project && (
        <div>
          <div className="flex justify-between items-end w-full space-y-4 mb-4">
            <div className="w-full max-w-lg ">
              <AspectRatio
                ratio={16 / 9}
                className="relative rounded-lg overflow-hidden"
              >
                <img
                  src={project.thumbnail}
                  alt="Project Thumbnail"
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <h1 className="text-4xl text-right">{project.title}</h1>
              <div className=" flex justify-start gap-2 lg:pl-16 pl-12 mt-2">
                {project.category.map((category) => (
                  <Badge variant="secondary">{category}</Badge>
                ))}
              </div>
              <div className=" flex items-center justify-end gap-4 mt-4">
                <Avatar>
                  <AvatarImage
                    src={
                      project.owner.avatar || "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
                <p>{project.owner.username}</p>
              </div>
              <div className=" flex gap-6 justify-end">
                <a
                  href={project.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              </div>
              {user.id === project.owner._id && (
                <div className=" flex gap-2 justify-end">
                  <Link to={``}>
                    <Button className="bg-green-700 hover:bg-green-800 px-2 sm:px-4 py-2 rounded-md">
                      <Pencil />
                    </Button>
                  </Link>
                  <Button
                    className="bg-red-600 hover:bg-red-700 px-2 sm:px-4 py-2 rounded-md"
                    // onClick={handlePlaylistDelete}
                  >
                    <Trash2 />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className=" text-justify mt-12">{parse(project.content)}</div>
        </div>
      )}
    </div>
  );
}

export default ViewProject;
