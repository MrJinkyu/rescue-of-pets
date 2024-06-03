import TemporaryProtectionList from "@/components/(home)/temporary-protection-list";
import { getTemporaryProtections } from "./action";
import AddButton from "@/components/common/add-button";
import LoginPrompt from "@/components/(auth)/login-prompt";

export default async function Home() {
  const temporaryProtections = await getTemporaryProtections();
  return (
    <section className="w-full flex-1 bg-neutral-100">
      <TemporaryProtectionList initList={temporaryProtections} />
      <AddButton link="/temporary-protection/new" />
      <LoginPrompt />
    </section>
  );
}