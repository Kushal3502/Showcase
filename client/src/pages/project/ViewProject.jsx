import { get } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function ViewProject() {
  const { projectId } = useParams();
  const [project, setProject] = useState();

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
                <div className="absolute inset-0 bg-black opacity-50"></div>
              </AspectRatio>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <h1 className="text-4xl text-right">{project.title}</h1>
              <div className=" flex items-center gap-4">
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
            </div>
          </div>
          <div className=" text-justify mt-12">{parse(project.content)}</div>
        </div>
      )}
    </div>
  );
}

export default ViewProject;
