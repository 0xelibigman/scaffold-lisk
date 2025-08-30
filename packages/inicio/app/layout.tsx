import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Montserrat } from "next/font/google"
import "./globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import { WagmiRainbowProvider } from "@/providers/wagmi-provider"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

export const metadata: Metadata = {
  title: "Inicio - AI-Powered Stakeholder Management",
  description: "AI-powered stakeholder relationship management platform for startup founders",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`font-sans ${geist.variable} ${montserrat.variable} antialiased h-full`}>
        <WagmiRainbowProvider>
          {children}
        </WagmiRainbowProvider>
      </body>
    </html>
  )
}
