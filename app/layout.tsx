import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MahsaTech — Web developers for your next project",
  description: "MahsaTech is a two-developer team building fast, modern websites and web apps. Let's build yours.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
