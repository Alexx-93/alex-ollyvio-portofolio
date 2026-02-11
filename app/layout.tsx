import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Alexander Ollyvio - Informatika Student | Developer",
  description:
    "Portfolio dari Alexander Ollyvio Kristo Sentono, mahasiswa Informatika Universitas Atma Jaya Yogyakarta yang passionate tentang web development dan cybersecurity.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/uajy-logo.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
