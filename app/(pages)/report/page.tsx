import AddButton from "@/components/common/add-button";
import { getCachedInitReports } from "./action";
import ReportList from "@/components/(report)/report-list";

export default async function Report() {
  const reports = await getCachedInitReports();
  return (
    <section className="w-full">
      <ReportList initList={reports} />
      <AddButton category="report" />
    </section>
  );
}
