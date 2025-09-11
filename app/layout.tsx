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
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-slate-950 text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
