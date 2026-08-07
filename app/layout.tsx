import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import MouseGlow from "@/components/MouseGlow";
import Loader from "@/components/Loader";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "SONU SINGH RATHORE — Freelance Video Editor & Graphic Designer",
  description:
    "I create videos that capture attention and designs that sell. Freelance video editing, motion graphics, and graphic design.",
  keywords: [
    "video editor",
    "graphic designer",
    "freelance video editing",
    "motion graphics",
    "thumbnail design",
    "YouTube editor",
  ],
  openGraph: {
    title: "SONU SINGH RATHORE — Freelance Video Editor & Graphic Designer",
    description: "Videos that capture attention. Designs that sell.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="noise antialiased">
        <Loader />
        <CustomCursor />
        <MouseGlow />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
