import StoryList from "@/components/(story)/story-list";
import AddButton from "@/components/common/add-button";
import { getInitMyStory } from "../../../(pages)/story/action";
import AddTopBar from "@/components/common/add-top-bar";

export default async function MyStory() {
  const myStorys = await getInitMyStory();
  return (
    <section className="w-full">
      <AddTopBar title="내 스토리" />
      <StoryList initList={myStorys} isMypage />
    </section>
  );
}
