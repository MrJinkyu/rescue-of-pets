import React, { InputHTMLAttributes } from "react";
import Label from "./label";

interface InputTextProps {
  name: string;
  title: string;
  errors?: string[];
}

export default function InputText({
  name,
  title,
  errors = [],
  ...props
}: InputTextProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Label title={title} />
        <input
          type="text"
          name={name}
          {...props}
          className="flex-1 p-2 outline-none border-none ring-1 ring-neutral-300 rounded-sm focus:ring-mainColor"
        />
      </div>
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium text-sm">
          {error}
        </span>
      ))}
    </div>
  );
}
