import DetailTopBar from "@/components/detail-top-bar";

export default function DetailPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DetailTopBar />
      <div className="pt-[53px]">{children}</div>
    </div>
  );
}
