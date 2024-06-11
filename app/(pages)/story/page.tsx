import StoryList from "@/components/(story)/story-list";
import { getInitStory } from "./action";
import AddButton from "@/components/common/add-button";

export default async function Story() {
  const storys = await getInitStory();

  return (
    <section className="w-full">
      <StoryList initList={storys} />
      <AddButton category="story" />
    </section>
  );
}
