import { notFound } from "next/navigation";
import { getIsLiked, getStory } from "./action";
import DetailTopBar from "@/components/common/detail-top-bar";
import { getSession } from "@/session/getSession";
import ProfileBar from "@/components/common/profile-bar";
import Image from "next/image";
import prismaDB from "@/database/db";
import { revalidatePath } from "next/cache";
import { HeartIcon } from "@heroicons/react/24/solid";

export default async function StoryDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }
  const story = await getStory(id);
  if (!story) {
    notFound();
  }

  async function likeStory() {
    "use server";
    try {
      const session = await getSession();
      await prismaDB.like.create({
        data: {
          storyId: id,
          userId: session.id!,
        },
      });
      revalidatePath(`/story/${id}`);
    } catch (e) {}
  }

  async function disLikeStory() {
    "use server";
    try {
      const session = await getSession();
      await prismaDB.like.delete({
        where: {
          id: {
            storyId: id,
            userId: session.id!,
          },
        },
      });
      revalidatePath(`/story/${id}`);
    } catch (e) {}
  }

  const {
    userId,
    user: { avatar, username },
    createdAt,
    photo,
    title,
    contents,
    view,
    _count: { likes, comments },
  } = story;
  const user = await getSession();
  const isOwner = userId === user.id;
  const isLiked = await getIsLiked(id);
  return (
    <section>
      <DetailTopBar isOwner={isOwner} id={story.id} category="report" />
      <ProfileBar avatar={avatar} username={username} createdAt={createdAt} />
      <div>
        <div className="flex flex-col gap-2 border-neutral-300 border-b">
          <h3 className="px-4 font-semibold text-md overflow-hidden whitespace-nowrap truncate">
            {title}
          </h3>
          <div className="px-4 flex items-center gap-2 *:text-sm *:text-neutral-500 *:font-medium">
            <span>좋아요 {likes}</span>
            <span>댓글 {comments}</span>
            <span>조회수 {view}</span>
          </div>
        </div>
        <div className="text-sm py-8 px-4">{contents}</div>
      </div>
      <div className="relative aspect-square">
        <Image src={photo} alt="반려동물 사진" fill className="object-cover" />
      </div>
      <form className="p-4" action={isLiked ? disLikeStory : likeStory}>
        <button
          className={`w-full ${isLiked ? "text-red-400" : "text-neutral-300"}`}
        >
          <HeartIcon className="size-6" />
        </button>
      </form>
    </section>
  );
}
