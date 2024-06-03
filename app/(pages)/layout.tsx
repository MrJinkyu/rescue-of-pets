import BottomBar from "@/components/common/bottom-bar";
import TopBar from "@/components/common/top-bar";

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
