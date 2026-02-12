"use client"

import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { useI18n } from "@/app/components/I18nProvider"

type TranslationFunction = {
  (key: string): string;
  <T = any>(key: string, options: { returnObjects: true }): T;
}

// Language proficiency component
const LanguageProficiency = ({
  name,
  proficiency,
  index,
}: {
  name: string
  proficiency: string
  index: number
}) => {
  return (
    <motion.div
      className="bg-slate-800 p-6 rounded-xl border border-indigo-500/20 shadow-lg hover:border-indigo-500/40 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full bg-indigo-500/20 mr-4">
          <Globe className="w-6 h-6 text-indigo-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">{name}</h3>
      </div>

      <p className="text-slate-300 text-lg">{proficiency}</p>
    </motion.div>
  )
}

export default function Languages() {
  const { t } = useI18n() as { t: TranslationFunction };
  
  const languages = [
    {
      name: t('languages.spanish.name'),
      proficiency: t('languages.spanish.proficiency'),
    },
    {
      name: t('languages.english.name'),
      proficiency: t('languages.english.proficiency'),
    },
  ]

  return (
    <section id="languages" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-950 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title={t('languages.sectionTitle')} />

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {languages.map((lang, index) => (
            <LanguageProficiency
              key={index}
              name={lang.name}
              proficiency={lang.proficiency}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
