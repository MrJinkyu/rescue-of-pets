import TemporaryProtectionList from "@/components/(home)/temporary-protection-list";
import AddButton from "@/components/common/add-button";
import { getCachedInitTemporaryProtections } from "./action";

export const metadata = {
  title: "임시보호",
};

export default async function Home() {
  const temporaryProtections = await getCachedInitTemporaryProtections();

  return (
    <section className="w-full">
      <TemporaryProtectionList initList={temporaryProtections} />
      <AddButton category="temporary-protection" />
    </section>
  );
}
