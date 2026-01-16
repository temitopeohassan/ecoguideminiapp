import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FarcasterSDKProvider } from "@/components/farcaster-sdk-provider"
import { FarcasterMetaTags } from "@/components/farcaster-meta-tags"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ecoguideminiapp.vercel.app"

export const metadata: Metadata = {
  title: "EcoGuide AI - Your Sustainability Coach",
  description: "Personalized AI-powered sustainability recommendations tailored to your lifestyle and constraints.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "EcoGuide AI - Your Sustainability Coach",
    description: "Personalized AI-powered sustainability recommendations tailored to your lifestyle and constraints.",
    images: [`${baseUrl}/og-image.png`],
    url: baseUrl,
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${baseUrl}/og-image.png`,
    "fc:frame:button:1": "Start Coaching",
    "fc:miniapp": "v1",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <FarcasterMetaTags />
        <FarcasterSDKProvider>
          {children}
        </FarcasterSDKProvider>
        <Analytics />
      </body>
    </html>
  )
}
