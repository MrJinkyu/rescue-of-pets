import React from "react";

export default function TemporaryProtectionDetailLoading() {
  return (
    <div>
      <div className="w-full px-4 py-3 flex justify-between items-center mt-[53px]">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-400 rounded-full flex justify-center items-end size-8" />
          <span className="bg-neutral-400 rounded-md w-8 h-4" />
        </div>
        <div className="bg-neutral-400 rounded-md w-8 h-4" />
      </div>
      <div className="relative aspect-square  bg-neutral-400" />
      <div className="flex flex-col p-4 pb-[52px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-20 h-5 rounded-md bg-neutral-400"></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 w-8 h-5 rounded-md bg-neutral-400" />
            <div className="p-1 w-6 h-5 rounded-md bg-neutral-400" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-24 h-5 bg-neutral-400 rounded-md" />
          <div className="w-24 h-5 bg-neutral-400 rounded-md" />
        </div>
      </div>
      <div className="w-full max-w-screen-sm fixed bottom-0 left-0 right-0 mx-auto h-[52px] bg-neutral-400" />
    </div>
  );
}
