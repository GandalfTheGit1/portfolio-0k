"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import en from "@/messages/en.json"
import es from "@/messages/es.json"

type Locale = "en" | "es"

type Messages = typeof en

type I18nContextType = {
  locale: Locale
  setLocale: (l: Locale) => void
  toggleLocale: () => void
  t: {
    (key: string): string;
    <T = any>(key: string, options: { returnObjects: true }): T;
  }
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function get(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => (acc && acc[part] != null ? acc[part] : undefined), obj)
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en"
    return (localStorage.getItem("locale") as Locale) || "en"
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", locale)
      // Optionally update <html lang>
      document.documentElement.lang = locale
    }
  }, [locale])

  const messages: Messages = useMemo(() => (locale === "es" ? es : en), [locale])

  const t = useMemo(
    () =>
      (key: string, options?: { returnObjects?: boolean }) => {
        const value = get(messages, key)
        if (options?.returnObjects) {
          return value || {}
        }
        return typeof value === "string" ? value : key
      },
    [messages]
  )

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale: () => setLocale((l) => (l === "en" ? "es" : "en")), t }),
    [locale, setLocale, t]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
