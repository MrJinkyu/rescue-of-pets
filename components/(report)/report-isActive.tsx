export default function ReportIsActive({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`${
        isActive ? "bg-red-600" : "bg-neutral-600"
      } p-1 rounded-md text-xs font-semibold text-white `}
    >
      {isActive ? "실종" : "완료"}
    </div>
  );
}
