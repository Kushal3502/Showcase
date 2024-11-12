import { ProjectCard } from "@/components";
import { get } from "@/utils/api";
import React, { useEffect, useState } from "react";

function Home() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const response = await get("/projects/");
    setProjects(response.projects);
    console.log(response);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className=" grid md:grid-cols-4 grid-cols-1 gap-12 py-12">      
      {projects &&
        projects.map((project) => (
          <div key={project._id}>
            <ProjectCard project={project} />
          </div>
        ))}
    </div>
  );
}

export default Home;
