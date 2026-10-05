import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"], variable: "--font-vazir" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "MahsaTech — Web, mobile, blockchain & AI developers",
  description: "MahsaTech is a small team of developers and marketers building fast, beautiful and scalable digital products. Let's build yours.",
};

export const viewport: Viewport = { themeColor: "#07080d" };

// Runs before paint so theme/language don't flash.
const initScript = `try{var d=document.documentElement,t=localStorage.getItem("theme"),l=localStorage.getItem("lang");
if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";
d.dataset.theme=t;if(l==="fa"){d.lang="fa";d.dir="rtl"}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${vazir.variable} ${display.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: initScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
