import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s | meet again", default: "meet again" },
  description:
    "반려동물 입양, 유기동물 실종신고 등 동물과 사람을 이어주는 서비스",
  keywords: [
    "meet again",
    "반려동물",
    "유기동물",
    "동물입양",
    "임시보호",
    "실종신고",
    "일상기록",
  ],
  openGraph: {
    title: "meet again",
    description:
      "반려동물 입양, 유기동물 실종신고 등 동물과 사람을 이어주는 서비스",
    siteName: "meet again",
    locale: "ko_KR",
    type: "website",
    url: "https://rescue-of-pets.vercel.app",
    images: {
      url: "/again.png",
    },
  },
  icons: {
    icon: "/meet.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-black max-w-screen-sm mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
