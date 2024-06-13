export default function StoryCommentForm({ storyId }: { storyId: number }) {
  return (
    <form className="flex items-center gap-3">
      <input
        type="text"
        className="bg-neutral-100 flex-1 px-3 py-2 rounded-sm border-none outline-none"
      />
      <button className="bg-mainColor text-white px-3 py-2 rounded-sm">
        입력
      </button>
    </form>
  );
}
