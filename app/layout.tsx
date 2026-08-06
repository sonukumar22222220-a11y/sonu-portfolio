import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import MouseGlow from "@/components/MouseGlow";
import Loader from "@/components/Loader";
import ChromeGate from "@/components/ChromeGate";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Sonu Singh Rathore — Video Editor & Motion Graphics Artist",
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
    title: "Sonu Singh Rathore — Video Editor & Motion Graphics Artist",
    description: "Videos that capture attention. Designs that sell.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="noise antialiased">
        <ChromeGate>
          <Loader />
          <CustomCursor />
          <MouseGlow />
        </ChromeGate>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
