import TemporaryProtectionForm from "@/components/(add)/temporary-protection-form";
import AddTopBar from "@/components/common/add-top-bar";

export default function NewTemporaryProtection() {
  return (
    <>
      <AddTopBar title="임시보호" />
      <TemporaryProtectionForm />
    </>
  );
}
