import { notFound } from "next/navigation";
import { getCachedLikeStatus, getCachedStory, getStory } from "./action";
import DetailTopBar from "@/components/common/detail-top-bar";
import { getSession } from "@/session/getSession";
import ProfileBar from "@/components/common/profile-bar";
import Image from "next/image";
import LikeAndComment from "@/components/common/like-and-comment";

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

  const {
    userId,
    user: { avatar, username },
    createdAt,
    photo,
    title,
    contents,
    _count: { comments },
  } = story;
  const user = await getSession();
  const isOwner = userId === user.id;
  const { isLiked, likeCount } = await getCachedLikeStatus(id, user.id!);
  return (
    <section className="pb-[56px]">
      <DetailTopBar isOwner={isOwner} id={story.id} category="story" />
      <div className="px-6">
        <h3 className="mt-[53px] pt-8 pb-4 w-full text-center font-semibold text-xl">
          {title}
        </h3>
        <ProfileBar
          avatar={avatar}
          username={username}
          createdAt={createdAt}
          isStory
          isColumn
        />
        <div className="text-md py-10 mt-5 border-neutral-300 border-t">
          {contents}
        </div>
        {photo && (
          <div className="relative aspect-square">
            <Image
              src={photo}
              alt="반려동물 사진"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
      <LikeAndComment
        isLiked={isLiked}
        likeCount={likeCount}
        storyId={id}
        commentCount={comments}
      />
    </section>
  );
}
