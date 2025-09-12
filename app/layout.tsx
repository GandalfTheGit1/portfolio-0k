import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/app/components/Navigation"
import { I18nProvider } from "@/app/components/I18nProvider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

export const metadata = {
  title: "William Marrero | Desarrollador Fullstack & Especialista en Automatización",
  description:
    "Portfolio de William Marrero - Desarrollador Fullstack con experiencia en React, Next.js, Nest.js, Supabase y automatización de procesos empresariales.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192x192.jpg", sizes: "192x192", type: "image/jpeg" },
      { url: "/icons/icon-512x512.jpg", sizes: "512x512", type: "image/jpeg" },
    ],
    apple: "/icons/icon-192x192.jpg",
    shortcut: "/favicon.ico",
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/jpeg" sizes="192x192" href="/icons/icon-192x192.jpg" />
        <link rel="icon" type="image/jpeg" sizes="512x512" href="/icons/icon-512x512.jpg" />
        <meta name="theme-color" content="#06b6d4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="William Marrero" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.jpg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.jpg" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-slate-950 text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <I18nProvider initialLocale="es">
            <Navigation />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
