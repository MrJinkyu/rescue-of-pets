import React, { InputHTMLAttributes } from "react";
import Label from "./label";

interface InputTextProps {
  name: string;
  title: string;
  errors?: string[];
  isReadonly?: boolean;
  isColumn?: boolean;
}

export default function InputText({
  name,
  title,
  errors = [],
  isReadonly = false,
  isColumn = false,
  ...props
}: InputTextProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col">
      <div className={`flex ${isColumn ? "flex-col gap-2" : "items-center"}`}>
        <Label title={title} />
        <input
          type="text"
          name={name}
          {...props}
          readOnly={isReadonly}
          className={`flex-1 p-2 outline-none border-none ring-1 ring-neutral-300 rounded-sm ${
            isReadonly
              ? "bg-neutral-200 cursor-not-allowed"
              : "focus:ring-mainColor"
          }`}
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
