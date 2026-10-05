import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"], variable: "--font-vazir" });

export const metadata: Metadata = {
  title: "MahsaTech — Web developers for your next project",
  description: "MahsaTech is a two-developer team building fast, modern websites and web apps. Let's build yours.",
};

// Runs before paint so theme/language don't flash.
const initScript = `try{var d=document.documentElement,t=localStorage.getItem("theme"),l=localStorage.getItem("lang");
if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";
d.dataset.theme=t;if(l==="fa"){d.lang="fa";d.dir="rtl"}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={vazir.variable}>
      <head><script dangerouslySetInnerHTML={{ __html: initScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
