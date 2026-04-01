import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased" style={{ height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div className="flex-1 overflow-y-auto overscroll-none">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
