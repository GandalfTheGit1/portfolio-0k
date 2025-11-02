"use client"

import { motion } from "framer-motion"
import { Code, Database, Server, Brain, Clipboard, Settings } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { useI18n } from "@/app/components/I18nProvider"
import { useEffect, useState } from "react"

// Particle animation component
const ParticleField = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Predefined particle configurations to avoid hydration mismatch
  const particleConfigs = [
    { x: 80.4, y: 79.9, scale: 0.7, opacity: 0.55, duration: 25 },
    { x: 15.4, y: 22.5, scale: 0.55, opacity: 0.64, duration: 30 },
    { x: 72.9, y: 92.8, scale: 0.7, opacity: 0.36, duration: 35 },
    { x: 77.5, y: 44.7, scale: 0.91, opacity: 0.52, duration: 28 },
    { x: 92.9, y: 9.5, scale: 0.93, opacity: 0.34, duration: 32 },
    { x: 83.3, y: 41.3, scale: 0.9, opacity: 0.49, duration: 26 },
    { x: 6.0, y: 97.1, scale: 0.55, opacity: 0.74, duration: 29 },
    { x: 46.3, y: 90.8, scale: 0.63, opacity: 0.47, duration: 31 },
    { x: 72.9, y: 29.3, scale: 0.8, opacity: 0.76, duration: 27 },
    { x: 56.1, y: 38.1, scale: 0.87, opacity: 0.58, duration: 33 },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleConfigs.map((config, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-indigo-500/30"
          initial={{
            x: config.x + "%",
            y: config.y + "%",
            scale: config.scale,
            opacity: config.opacity,
          }}
          animate={{
            x: [config.x + "%", ((config.x + 20) % 100) + "%", ((config.x + 40) % 100) + "%", config.x + "%"],
            y: [config.y + "%", ((config.y + 30) % 100) + "%", ((config.y + 60) % 100) + "%", config.y + "%"],
          }}
          transition={{
            duration: config.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default function About() {
  const { t } = useI18n()
  const skills = [
    {
      icon: <Code className="w-8 h-8 text-indigo-400" />,
      title: t("about.skills.frontend.title"),
      description: t("about.skills.frontend.desc"),
    },
    {
      icon: <Server className="w-8 h-8 text-blue-400" />,
      title: t("about.skills.backend.title"),
      description: t("about.skills.backend.desc"),
    },
    {
      icon: <Database className="w-8 h-8 text-violet-400" />,
      title: t("about.skills.db.title"),
      description: t("about.skills.db.desc"),
    },
    {
      icon: <Brain className="w-8 h-8 text-fuchsia-400" />,
      title: t("about.skills.ai.title"),
      description: t("about.skills.ai.desc"),
    },
    {
      icon: <Clipboard className="w-8 h-8 text-sky-400" />,
      title: t("about.skills.business.title"),
      description: t("about.skills.business.desc"),
    },
    {
      icon: <Settings className="w-8 h-8 text-teal-400" />,
      title: t("about.skills.other.title"),
      description: t("about.skills.other.desc"),
    },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-900 to-slate-950 z-0"></div>
      <ParticleField />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeading title={t("about.sectionTitle")} />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-indigo-500/20">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-full bg-indigo-500/20 mr-4">
                  <Brain className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">{t("about.roleHeading")}</h3>
              </div>

              <p className="text-xl text-slate-300 leading-relaxed mb-6">{t("about.p1")}</p>
              <p className="text-xl text-slate-300 leading-relaxed">{t("about.p2")}</p>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-indigo-500/20 group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              >
                <div className="bg-slate-800 p-3 rounded-xl inline-block mb-4 group-hover:bg-indigo-500/20 transition-colors duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{skill.title}</h3>
                <p className="text-slate-300">{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
