import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s - meet again", default: "meet again" },
  description: "반려동물 입양, 반려동물 실종신고",
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
