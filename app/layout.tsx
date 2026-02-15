import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alexander Ollyvio - Informatika Student | Developer",
  description:
    "Portfolio dari Alexander Ollyvio Kristo Sentono, mahasiswa Informatika Universitas Atma Jaya Yogyakarta yang passionate tentang web development dan cybersecurity.",
  generator: "v0.app",
  icons: {
    icon: "/logo-ax.png",
  },
};

// penting untuk mobile - prevent zoom
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
