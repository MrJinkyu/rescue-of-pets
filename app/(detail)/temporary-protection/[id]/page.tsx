export default function TemporaryProtectionDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  return <div>상세페이지 {id}</div>;
}
