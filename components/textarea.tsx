import { TextareaHTMLAttributes } from "react";
import Label from "./label";

interface TextareaProps {
  name: string;
  title: string;
  errors?: string[];
}

export default function Textarea({
  name,
  title,
  errors = [],
  ...props
}: TextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col">
      <div className="flex items-start">
        <Label title={title} />
        <textarea
          name={name}
          {...props}
          className="p-2 flex-1 h-40 resize-none outline-none border-none ring-1 ring-neutral-300 rounded-sm focus:ring-mainColor"
        />
      </div>
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
