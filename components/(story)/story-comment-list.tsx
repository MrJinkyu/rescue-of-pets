import StoryCommentCard from "./story-comment-card";
import StoryCommentForm from "./story-comment-form";

export interface StoryComment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  payload: string;
  storyId: number;
  userId: number;
  user: { avatar: null | string; username: string };
}

interface StoryCommentListProps {
  commentList: StoryComment[];
  storyId: number;
}

export default function StoryCommentList({
  commentList,
  storyId,
}: StoryCommentListProps) {
  return (
    <div className="mt-[53px] px-4">
      <StoryCommentForm storyId={storyId} />
      <div className="px-2 py-2">
        {commentList.map((comment) => (
          <StoryCommentCard key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
}
