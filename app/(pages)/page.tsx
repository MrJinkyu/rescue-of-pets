import TemporaryProtectionList from "@/components/(home)/temporary-protection-list";
import { getTemporaryProtections } from "./action";
import AddButton from "@/components/add-button";

export default async function Home() {
  const temporaryProtections = await getTemporaryProtections();
  return (
    <section className="w-full flex-1 bg-neutral-100">
      <TemporaryProtectionList initList={temporaryProtections} />
      <AddButton link="/temporary-protection/new" />
    </section>
  );
}
