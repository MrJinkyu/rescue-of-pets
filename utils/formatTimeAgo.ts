export default function formatTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);
  if (diff === 0) {
    return "오늘";
  }
  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "days");
}
