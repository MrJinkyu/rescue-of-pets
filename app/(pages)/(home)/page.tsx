import TemporaryProtectionList from "@/components/(home)/temporary-protection-list";
import AddButton from "@/components/common/add-button";
import { getCachedInitTemporaryProtections } from "./action";

export default async function Home() {
  const temporaryProtections = await getCachedInitTemporaryProtections();

  return (
    <section className="w-full">
      <TemporaryProtectionList initList={temporaryProtections} />
      <AddButton category="temporary-protection" />
    </section>
  );
}
