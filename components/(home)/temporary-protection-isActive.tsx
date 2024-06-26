export default function TemporaryProtectionIsActive({
  isActive,
}: {
  isActive: boolean;
}) {
  return (
    <div
      className={`${
        isActive
          ? "border-green-200 text-green-600"
          : "border-neutral-200 text-neutral-600"
      } p-1 rounded-md text-xs font-semibold border-2 `}
    >
      {isActive ? "보호중" : "완료"}
    </div>
  );
}
