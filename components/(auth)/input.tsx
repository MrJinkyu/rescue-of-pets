import { InputHTMLAttributes } from "react";

interface InputProps {
  label: string;
  name: string;
  errors?: string[];
}

export default function Input({
  label,
  name,
  errors = [],
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="font-semibold">{label}</div>
      <input
        name={name}
        {...props}
        className="border-none outline-none flex-1 ring-neutral-400 ring-2 rounded-sm p-2 focus:ring-blue-500"
      />
      {errors.map((error, index) => (
        <div key={index} className="text-red-500">
          {error}
        </div>
      ))}
    </div>
  );
}
