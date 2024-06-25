import TemporaryProtectionList from "@/components/(home)/temporary-protection-list";
import AddButton from "@/components/common/add-button";
import {
  getCachedInitTemporaryProtections,
  getInitTemporaryProtections,
} from "./action";

// async function waitUi() {
//   await new Promise((resolve) => setTimeout(resolve, 10000));
// }
// const test = await waitUi()

export default async function Home() {
  const temporaryProtections = await getCachedInitTemporaryProtections();

  return (
    <section className="w-full">
      <TemporaryProtectionList initList={temporaryProtections} />
      <AddButton category="temporary-protection" />
    </section>
  );
}
