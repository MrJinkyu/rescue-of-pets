import { notFound } from "next/navigation";
import { getCachedLikeStatus, getCachedStory, getStory } from "./action";
import DetailTopBar from "@/components/common/detail-top-bar";
import { getSession } from "@/session/getSession";
import ProfileBar from "@/components/common/profile-bar";
import Image from "next/image";
import prismaDB from "@/database/db";
import { revalidateTag } from "next/cache";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon as OutlineHeartIcon,
} from "@heroicons/react/24/outline";

export default async function StoryDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }
  const story = await getCachedStory(id);
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
      revalidateTag(`story-liked-${id}`);
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
      revalidateTag(`story-liked-${id}`);
    } catch (e) {}
  }

  const {
    userId,
    user: { avatar, username },
    createdAt,
    photo,
    title,
    contents,
    _count: { likes, comments },
  } = story;
  const user = await getSession();
  const isOwner = userId === user.id;
  const { isLiked, likeCount } = await getCachedLikeStatus(id, user.id!);
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
            <span>좋아요 {likeCount}</span>
            <span>댓글 {comments}</span>
          </div>
        </div>
        <div className="text-sm py-8 px-4">{contents}</div>
      </div>
      <div className="relative aspect-square">
        <Image src={photo} alt="반려동물 사진" fill className="object-cover" />
      </div>
      <div className="flex items-center">
        <form
          className="p-4 flex items-center"
          action={isLiked ? disLikeStory : likeStory}
        >
          <button
            className={`w-full ${isLiked ? "text-red-400" : "text-black"}`}
          >
            {isLiked ? (
              <SolidHeartIcon className="size-6" />
            ) : (
              <OutlineHeartIcon className="size-6" />
            )}
          </button>
        </form>
        <ChatBubbleBottomCenterIcon className="size-6" />
      </div>
    </section>
  );
}
