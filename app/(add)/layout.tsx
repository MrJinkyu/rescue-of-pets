export default function DetailPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="pt-[53px] pb-[52px]">{children}</div>
    </div>
  );
}
