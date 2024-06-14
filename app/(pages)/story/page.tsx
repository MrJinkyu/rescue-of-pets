import StoryList from "@/components/(story)/story-list";
import { getInitStory } from "./action";
import AddButton from "@/components/common/add-button";

async function waitUi() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

export default async function Story() {
  const test = await waitUi();

  const storys = await getInitStory();

  return (
    <section className="w-full">
      <StoryList initList={storys} />
      <AddButton category="story" />
    </section>
  );
}
