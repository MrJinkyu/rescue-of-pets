import TopBar from "@/components/top-bar";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
}
