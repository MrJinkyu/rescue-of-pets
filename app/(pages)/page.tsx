import TemporaryProtectionList from "@/components/(home)/temporary-protection-list";
import AddButton from "@/components/common/add-button";
import { getInitTemporaryProtections } from "./action";

export default async function Home() {
  const temporaryProtections = await getInitTemporaryProtections();
  return (
    <section className="w-full flex-1 bg-neutral-100">
      <TemporaryProtectionList initList={temporaryProtections} />
      <AddButton category="temporary-protection" />
    </section>
  );
}
