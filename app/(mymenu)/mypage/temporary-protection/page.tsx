import { getInitMyTemporaryProtections } from "@/app/(pages)/(home)/action";
import TemporaryProtectionList from "@/components/(home)/temporary-protection-list";
import AddTopBar from "@/components/common/add-top-bar";

export default async function MyTemporaryProtection() {
  const myTemporaryProtections = await getInitMyTemporaryProtections();

  return (
    <section className="w-full">
      <AddTopBar title="내 임시보호" />
      <TemporaryProtectionList initList={myTemporaryProtections} isMypage />
    </section>
  );
}
