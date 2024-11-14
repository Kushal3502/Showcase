import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProjectForm } from "@/components";
import { Button } from "@/components/ui/button";
import { categories } from "@/config/category";
import { post } from "@/utils/api";

function AddProject() {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const file = data.thumbnail[0];

    const formData = new FormData();

    formData.append("media", file);
    const response = await post("/media/", formData);
    console.log(response);

    if (response) {
      const projectData = {
        title: data.title,
        thumbnail: response.data.secure_url,
        category: data.categories,
        githubRepo: data.githubRepo,
        liveUrl: data.liveUrl,
        content: data.content,
      };
      const uploadProject = await post("/projects/", projectData);

      console.log(uploadProject);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="thumbnail">Thumbnail:</Label>
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          className="bg-transparent w-full"
          {...register("thumbnail", { required: "Thumbnail is required" })}
        />
        {errors.thumbnail && (
          <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="title">Title:</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter title..."
          className="bg-transparent w-full"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="githubRepo">Github Repo:</Label>
        <Input
          id="githubRepo"
          type="text"
          placeholder="Enter Github repo..."
          className="bg-transparent w-full"
          {...register("githubRepo", { required: "Github Repo is required" })}
        />
        {errors.githubRepo && (
          <p className="text-red-500 text-sm">{errors.githubRepo.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="liveUrl">Live URL:</Label>
        <Input
          id="liveUrl"
          type="text"
          placeholder="Enter live url..."
          className="bg-transparent w-full"
          {...register("liveUrl", { required: "Live URL is required" })}
        />
        {errors.liveUrl && (
          <p className="text-red-500 text-sm">{errors.liveUrl.message}</p>
        )}
      </div>
      <div>
        <Label>Category:</Label>
        <div className="space-y-2 flex gap-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={category}
                value={category}
                {...register("categories", {
                  required: "Please select at least one category",
                })}
              />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))}
          {errors.categories && (
            <p className="text-red-500 text-sm">{errors.categories.message}</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="content">Content:</Label>
        <ProjectForm
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </form>
  );
}

export default AddProject;
