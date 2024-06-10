import ReportForm from "@/components/(add)/report-form";
import AddTopBar from "@/components/common/add-top-bar";

export default function NewTemporaryProtection() {
  return (
    <>
      <AddTopBar title="실종신고" />
      <p className="text-center text-sm pt-4 text-neutral-500">
        * 상황이 종료된 후에는 완료로 수정해주세요
      </p>
      <ReportForm />
    </>
  );
}
