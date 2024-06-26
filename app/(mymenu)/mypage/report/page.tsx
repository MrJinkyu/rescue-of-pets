import ReportList from "@/components/(report)/report-list";
import { getInitMyReports } from "../../../(pages)/report/action";
import AddTopBar from "@/components/common/add-top-bar";
import EmptyText from "@/components/common/empty-text";

export default async function MyReport() {
  const myReports = await getInitMyReports();
  return (
    <section className="w-full">
      <AddTopBar title="내 실종신고" />
      {myReports.length === 0 && (
        <EmptyText text="현재 작성한 게시물이 없습니다!" />
      )}
      <ReportList initList={myReports} isMypage />
    </section>
  );
}
