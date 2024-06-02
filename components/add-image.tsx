import { PhotoIcon } from "@heroicons/react/24/solid";

export default function AddImage({
  updatePhoto,
}: {
  updatePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="text-center mx-auto">
      <input
        type="file"
        name="photo"
        id="file"
        className="hidden"
        onChange={updatePhoto}
      />
      <label
        htmlFor="file"
        className="flex flex-col justify-center items-center size-32 rounded-sm *:text-neutral-400 bg-neutral-50/50 ring-neutral-300 ring-1 active:ring-mainColor active:bg-sky-50/50"
      >
        <PhotoIcon className="size-14" />
        <span>사진 추가하기</span>
      </label>
    </div>
  );
}
