import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Cardinal Capital Markets — Professional Swing Trading Bots",
  description:
    "Access professionally backtested and live-tested swing trading bots for stocks, options, and futures. Automated. Tested. Built to perform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} scroll-smooth`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
