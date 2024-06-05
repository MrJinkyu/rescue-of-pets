import BottomNavigationBar from "@/components/common/bottom-navigation-bar";
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
      <BottomNavigationBar />
    </div>
  );
}
