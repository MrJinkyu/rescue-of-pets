import TemporaryProtectionForm from "@/components/(add)/temporary-protection-form";
import AddTopBar from "@/components/common/add-top-bar";

export default function NewTemporaryProtection() {
  return (
    <>
      <AddTopBar title="임시보호" />
      <p className="text-center text-sm pt-4 text-neutral-500">
        * 상황이 종료된 후에는 완료로 수정해주세요
      </p>
      <TemporaryProtectionForm />
    </>
  );
}
