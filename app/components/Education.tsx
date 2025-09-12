"use client"

import { Calendar, BookOpen } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { motion } from "framer-motion"
import { useI18n } from "@/app/components/I18nProvider"

type TranslationFunction = {
  (key: string): string;
  <T = any>(key: string, options: { returnObjects: true }): T;
}

// Education card component
const EducationCard = ({
  degree,
  institution,
  period,
  additional,
  icon: Icon,
  index,
}: {
  degree: string
  institution: string
  period: string
  additional: string
  icon: any
  index: number
}) => {
  return (
    <motion.div
      className="bg-slate-800/90 backdrop-blur-md p-6 rounded-xl border border-indigo-500/20 shadow-lg hover:border-indigo-500/40 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full bg-indigo-500/20 mr-4">
          <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        <h3 className="text-2xl font-bold text-white font-display">{degree}</h3>
      </div>
      <p className="text-xl text-slate-300 mb-2">{institution}</p>
      <p className="text-slate-400 flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        {period}
      </p>
      <p className="text-slate-300 font-medium mt-2">{additional}</p>
    </motion.div>
  )
}

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  additional: string;
  icon?: any; // Make icon optional since it's not in the translation
}

// Add icon mapping since we don't store icons in translations
const iconMap: { [key: string]: any } = {
  'Contabilidad y Finanzas': BookOpen,
  'Accounting and Finance': BookOpen,
  'Ciencias Informáticas': BookOpen,
  'Computer Science': BookOpen
};

export default function Education() {
  const { t } = useI18n() as { t: TranslationFunction };
  
  // Get education data from translations with proper typing
  const degreesData = t<Array<{
    degree: string;
    institution: string;
    period: string;
    additional: string;
  }>>('education.degrees', { returnObjects: true });
  
  // Ensure degrees is always an array and add icons
  const education: EducationItem[] = Array.isArray(degreesData) 
    ? degreesData.map(edu => ({
        ...edu,
        icon: iconMap[edu.degree] || BookOpen
      }))
    : [];

  return (
    <section id="education" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-900 to-slate-950 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title={t('education.sectionTitle')} />

        <div className="max-w-4xl mx-auto space-y-6 mt-12">
          {education.map((edu, index) => (
            <EducationCard
              key={index}
              degree={edu.degree}
              institution={edu.institution}
              period={edu.period}
              additional={edu.additional}
              icon={edu.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
