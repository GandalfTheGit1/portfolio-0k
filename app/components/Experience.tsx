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
  role: string;
  company: string;
  color: string;
  type: string;
  projects: Project[];
  key: string;
}

export default function Experience() {
  const { t } = useI18n() as { t: TranslationFunction };
  
  const getProjects = (key: string): Project[] => {
    try {
      const projects = t<Project[]>(`experience.${key}.projects`, { returnObjects: true });
      return Array.isArray(projects) ? projects : [];
    } catch (error) {
      console.error(`Error loading projects for ${key}:`, error);
      return [];
    }
  };
  
  const experiences: ExperienceItem[] = [
    {
      period: t("experience.periods.freelance"),
      role: t("experience.freelance.role"),
      company: t("experience.freelance.company"),
      color: "indigo",
      type: "professional",
      projects: getProjects("freelance"),
      key: "freelance"
    },
    {
      period: t("experience.periods.hardwareSpecialist"),
      role: t("experience.hardwareSpecialist.role"),
      company: t("experience.hardwareSpecialist.company"),
      color: "blue",
      type: "professional",
      projects: getProjects("hardwareSpecialist"),
      key: "hardwareSpecialist"
    },
    {
      period: t("experience.periods.education"),
      role: t("experience.education.role"),
      company: t("experience.education.company"),
      color: "violet",
      type: "education",
      projects: getProjects("education"),
      key: "education"
    },
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
                      ) : (
                        <Zap className={`w-5 h-5 text-${exp.color}-400`} />
                      )}
                      {exp.role}
                    </h3>
                    <div className="flex items-center text-indigo-400 mt-2 md:mt-0">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <MapPin className="w-4 h-4 text-slate-400 mr-1" />
                    <span className="text-slate-300">{exp.company}</span>
                    {exp.type === "leadership" && (
                      <span className="ml-3 px-2 py-1 bg-violet-500/20 text-violet-300 text-xs rounded-full border border-violet-500/30">
                        {t("experience.labels.leadership")}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {exp.projects.map((project: Project, i: number) => (
                      <motion.div
                        key={i}
                        className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 group hover:border-indigo-500/30 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                      >
                        <h4 className="text-lg font-semibold text-white mb-2">{project.title}</h4>
                        <p className="text-slate-300">{project.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
