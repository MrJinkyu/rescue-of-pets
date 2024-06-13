import StoryForm from "@/components/(add)/story-form";
import AddTopBar from "@/components/common/add-top-bar";

export default function NewStory() {
  return (
    <>
      <AddTopBar title="스토리" />
      <StoryForm />
    </>
  );
}
