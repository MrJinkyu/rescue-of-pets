import { useState } from "react";
import SelectBar from "./select-bar";
import Label from "./label";

interface LabelAndSelectBarProps {
  title: string;
  options: string[];
  name: string;
  selectValue: (name: string, value: string) => void;
  value: string;
}

export default function LabelAndSelectBar({
  title,
  name,
  options,
  selectValue,
  value,
}: LabelAndSelectBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const closeBar = () => {
    setIsVisible(false);
  };
  return (
    <div>
      <div className="w-full flex items-center">
        <Label title={title} />
        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          className={`cursor-pointer text-neutral-500 border-none outline-none ring-1 ring-neutral-300 px-4 py-2 rounded-sm focus:ring-mainColor focus:text-mainColor`}
        >
          {value}
        </button>
      </div>
      {isVisible && (
        <SelectBar
          title={title}
          name={name}
          options={options}
          closeBar={closeBar}
          selectValue={selectValue}
        />
      )}
    </div>
  );
}
