import ReportList from "@/components/(report)/report-list";
import { getInitMyReports } from "../../../(pages)/report/action";
import AddTopBar from "@/components/common/add-top-bar";

export default async function MyReport() {
  const myReports = await getInitMyReports();
  return (
    <section className="w-full">
      <AddTopBar title="내 실종신고" />
      <ReportList initList={myReports} isMypage />
    </section>
  );
}
