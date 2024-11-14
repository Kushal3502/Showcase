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
  Heading,
  Highlight,
  HorizontalRule,
  Image.configure({
    upload: (file) => {
      return new Promise((resolve,reject) => {
        console.log(file);
      });
    },
  }),
  Video.configure({
    upload: (files) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files));
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
