export default function TemporaryProtectionGender({
  gender,
}: {
  gender: string;
}) {
  return (
    <div
      className={`${
        gender === "암컷"
          ? "border-pink-100 text-pink-600"
          : "border-blue-100 text-blue-600"
      } p-1 rounded-md text-xs font-semibold border-2`}
    >
      {gender}
    </div>
  );
}
