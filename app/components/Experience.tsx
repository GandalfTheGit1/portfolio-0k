"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, Zap, Users, Crown } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { useI18n } from "@/app/components/I18nProvider"

type TranslationFunction = {
  (key: string): string;
  <T = any>(key: string, options: { returnObjects: true }): T;
}

interface Project {
  title: string;
  description: string;
}

interface ExperienceItem {
  period: string;
  title: string;
  description: string;
  color: string;
  type: string;
  skills: string[];
  key: string;
}

export default function Experience() {
  const { t } = useI18n() as { t: TranslationFunction };
  
  const getSkills = (key: string): string[] => {
    try {
      const skills = t<string[]>(`experience.${key}.skills`, { returnObjects: true });
      return Array.isArray(skills) ? skills : [];
    } catch (error) {
      console.error(`Error loading skills for ${key}:`, error);
      return [];
    }
  };
  
  const experiences: ExperienceItem[] = [
    {
      period: t("experience.periods.2020_2021"),
      title: t("experience.automationDevelopment.title"),
      description: t("experience.automationDevelopment.description"),
      color: "green",
      type: "technical",
      skills: getSkills("automationDevelopment"),
      key: "automationDevelopment"
    },
    {
      period: t("experience.periods.2021_Present"),
      title: t("experience.fullstackDevelopment.title"),
      description: t("experience.fullstackDevelopment.description"),
      color: "blue",
      type: "technical",
      skills: getSkills("fullstackDevelopment"),
      key: "fullstackDevelopment"
    },
    {
      period: t("experience.periods.2021_Present"),
      title: t("experience.financeTechnical.title"),
      description: t("experience.financeTechnical.description"),
      color: "orange",
      type: "finance",
      skills: getSkills("financeTechnical"),
      key: "financeTechnical"
    }
  ]

  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-950 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title={t("experience.sectionTitle")} />

        <div className="max-w-5xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="mb-12 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute top-16 bottom-0 left-8 w-0.5 bg-gradient-to-b from-indigo-500 to-blue-500">
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-white"
                    animate={{
                      y: [0, 100, 200, 300, 400],
                      opacity: [1, 0.8, 0.6, 0.4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </div>
              )}

              <div className="flex items-start">
                {/* Timeline dot */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center z-10 relative border border-indigo-500/30">
                    {exp.type === "leadership" ? (
                      <Crown className={`w-8 h-8 text-${exp.color}-400`} />
                    ) : (
                      <Briefcase className={`w-8 h-8 text-${exp.color}-400`} />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="ml-8 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-indigo-500/20 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2 font-display">
                      {exp.type === "leadership" ? (
                        <Users className={`w-5 h-5 text-${exp.color}-400`} />
                      ) : exp.type === "education" ? (
                        <Crown className={`w-5 h-5 text-${exp.color}-400`} />
                      ) : (
                        <Zap className={`w-5 h-5 text-${exp.color}-400`} />
                      )}
                      {exp.title}
                    </h3>
                    <div className="flex items-center text-indigo-400 mt-2 md:mt-0">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4">{exp.description}</p>

                  {exp.skills.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      {exp.skills.map((skill: string, i: number) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
