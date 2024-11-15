import { post } from "@/utils/api";
import React from "react";
import { Controller } from "react-hook-form";
import RichTextEditor, {
  BaseKit,
  Bold,
  BulletList,
  Code,
  Color,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  Image,
  Italic,
  Video,
} from "reactjs-tiptap-editor";

import "reactjs-tiptap-editor/style.css";

const extensions = [
  BaseKit,
  Heading,
  Italic,
  Bold,
  BulletList,
  Code,
  Color,
  FontFamily,
  FontSize,
  Highlight,
  HorizontalRule,
  Image.configure({
    upload: (file) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const formData = new FormData();
          formData.append("media", file);
          console.log(formData);

          post("/media/", formData).then((response) => {
            if (!response.success) {
              throw new Error("Network response was not ok");
            }
            console.log(response);
          });
          resolve(URL.createObjectURL(file));
        }, 500);
      });
    },
  }),
  Video.configure({
    upload: (file) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const formData = new FormData();
          formData.append("media", file);
          console.log(formData);

          post("/media/", formData).then((response) => {
            if (!response.success) {
              throw new Error("Network response was not ok");
            }
            console.log(response);
          });
          resolve(URL.createObjectURL(file));
        }, 500);
      });
    },
  }),
];

function ProjectForm({ name, control, defaultValue = "" }) {
  return (
    <div className="mb-6">
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <RichTextEditor
            output="html"
            content={value || defaultValue}
            extensions={extensions}
            onChangeContent={onChange}
          />
        )}
      />
    </div>
  );
}

export default ProjectForm;
