import TemporaryProtectionList from "@/components/(home)/temporary-protection-list";
import { getTemporaryProtections } from "./action";

export default async function Home() {
  const temporaryProtections = await getTemporaryProtections();
  return (
    <section>
      <TemporaryProtectionList initList={temporaryProtections} />
    </section>
  );
}
