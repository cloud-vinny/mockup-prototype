import type { Metadata } from "next";
import { Montserrat, My_Soul } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const mySoul = My_Soul({
  variable: "--font-my-soul",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fish AI — Underwater species analysis",
  description:
    "Scan and review underwater footage to identify fish species on video.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${mySoul.variable}`}>
      <body>{children}</body>
    </html>
  );
}
