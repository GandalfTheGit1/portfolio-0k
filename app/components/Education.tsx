"use client"

import { Calendar, BookOpen } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { motion } from "framer-motion"

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

export default function Education() {
  const education = [
    {
      degree: "Contabilidad y Finanzas",
      institution: "Universidad de La Habana",
      period: "2021 – 2025",
      additional: "Formación en principios contables, análisis financiero y gestión empresarial",
      icon: BookOpen,
    },
    {
      degree: "Ciencias Informáticas",
      institution: "Universidad de Ciencias Informáticas",
      period: "2020 – 2021",
      additional: "Fundamentos de programación y desarrollo de software",
      icon: BookOpen,
    },
  ]

  return (
    <section id="education" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-900 to-slate-950 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Educación" />

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
