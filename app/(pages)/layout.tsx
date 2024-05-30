import BottomBar from "@/components/bottom-bar";
import TopBar from "@/components/top-bar";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TopBar />
      <div className="pt-[53px] pb-[73px]">{children}</div>
      <BottomBar />
    </div>
  );
}
