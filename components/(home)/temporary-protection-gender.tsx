export default function TemporaryProtectionGender({
  gender,
}: {
  gender: string;
}) {
  if (gender === "미확인") {
    return null;
  }
  return (
    <div
      className={`${
        gender === "암컷"
          ? "border-pink-200 text-pink-600"
          : "border-blue-200 text-blue-600"
      } p-1 rounded-md text-xs font-semibold border-2`}
    >
      {gender}
    </div>
  );
}
