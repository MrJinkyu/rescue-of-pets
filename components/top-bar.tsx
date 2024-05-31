import { BellIcon } from "@heroicons/react/24/solid";

export default function TopBar() {
  return (
    <div className="fixed top-0 w-full max-w-screen-sm mx-auto flex items-center justify-between px-5 py-3 z-20 border-neutral-200 border-b bg-white">
      <h1 className="font-semibold text-xl text-mainColor">meetAgain</h1>
      <div>
        <BellIcon className="size-7 text-mainColor" />
      </div>
    </div>
  );
}
