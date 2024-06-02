"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
interface SelectBarProps {
  title: string;
  name: string;
  options: string[];
  closeBar: () => void;
  selectValue: (name: string, value: string) => void;
}

export default function SelectBar({
  title,
  name,
  options,
  closeBar,
  selectValue,
}: SelectBarProps) {
  const selectOption = (option: string) => {
    selectValue(name, option);
    closeBar();
  };
  return (
    <section className="w-full max-w-screen-sm h-full z-30 fixed top-0 left-0 right-0 mx-auto bg-neutral-950/50">
      <article className="fixed bottom-0 flex flex-col w-full max-w-screen-sm h-[280px] bg-white text-black animate-fadeInUp">
        <header className="flex justify-between py-4 px-6">
          <ChevronLeftIcon
            onClick={closeBar}
            className="size-6 cursor-pointer"
          />
          <div className="text-center text-xl font-semibold">{title} 선택</div>
          <div className="size-6"></div>
        </header>
        <main className="flex flex-col items-center gap-2 py-12 overflow-y-auto">
          {options.map((option, index) => {
            return (
              <div
                key={index}
                className="text-lg font-semibold active:bg-neutral-100 w-full text-center py-1"
                onClick={() => selectOption(option)}
              >
                {option}
              </div>
            );
          })}
        </main>
      </article>
    </section>
  );
}
