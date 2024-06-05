import prismaDB from "@/database/db";
import { TrashIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";

export default async function DetailDeleteButton({ id }: { id: number }) {
  async function deletePost() {
    await prismaDB.temporaryProtection.delete({
      where: {
        id,
      },
      select: null,
    });
    redirect("/");
  }
  return (
    <form
      action={deletePost}
      className="flex gap-2 items-center justify-center flex-1 cursor-pointer text-black font-semibold"
    >
      <TrashIcon className="size-4" />
      <input type="text" name="id" value={id} className="hidden" />
      <button>글 지우기</button>
    </form>
  );
}
