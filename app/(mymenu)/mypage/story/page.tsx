import StoryList from "@/components/(story)/story-list";
import AddButton from "@/components/common/add-button";
import { getInitMyStory } from "../../../(pages)/story/action";
import AddTopBar from "@/components/common/add-top-bar";
import EmptyText from "@/components/common/empty-text";

export default async function MyStory() {
  const myStorys = await getInitMyStory();
  return (
    <section className="w-full">
      <AddTopBar title="내 스토리" />
      {myStorys.length === 0 && (
        <EmptyText text="현재 작성한 게시물이 없습니다!" />
      )}
      <StoryList initList={myStorys} isMypage />
    </section>
  );
}
