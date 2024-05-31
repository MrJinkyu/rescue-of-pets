export default function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatter.format(date);
}
