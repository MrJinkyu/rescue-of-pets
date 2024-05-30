import { BellIcon } from "@heroicons/react/24/solid";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="font-semibold text-xl text-sky-500">meetAgain</h1>
      <div>
        <BellIcon className="size-7 text-sky-500" />
      </div>
    </div>
  );
}
