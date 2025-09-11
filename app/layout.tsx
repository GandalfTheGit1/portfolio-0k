import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/app/components/Navigation"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

export const metadata = {
  title: "William Marrero | Desarrollador Fullstack & Especialista en Automatización",
  description:
    "Portfolio de William Marrero - Desarrollador Fullstack con experiencia en React, Next.js, Nest.js, Supabase y automatización de procesos empresariales.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192x192.jpg",
  },
  themeColor: "#06b6d4",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06b6d4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="William Marrero" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.jpg" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-slate-950 text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
