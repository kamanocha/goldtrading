import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoldVault SG — Save in Gold",
  description:
    "Buy and sell 24K digital gold in Singapore dollars. Secure, instant, and fully backed by physical gold.",
  keywords: ["gold", "investment", "Singapore", "SGD", "digital gold"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
