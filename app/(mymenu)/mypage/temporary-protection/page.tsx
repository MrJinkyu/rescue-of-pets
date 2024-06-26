import { getInitMyTemporaryProtections } from "@/app/(pages)/(home)/action";
import TemporaryProtectionList from "@/components/(home)/temporary-protection-list";
import AddTopBar from "@/components/common/add-top-bar";
import EmptyText from "@/components/common/empty-text";

export default async function MyTemporaryProtection() {
  const myTemporaryProtections = await getInitMyTemporaryProtections();

  return (
    <section className="w-full">
      <AddTopBar title="내 임시보호" />
      {myTemporaryProtections.length === 0 && (
        <EmptyText text="현재 작성한 게시물이 없습니다!" />
      )}
      <TemporaryProtectionList initList={myTemporaryProtections} isMypage />
    </section>
  );
}
