"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, Zap, Users, Crown } from "lucide-react"
import SectionHeading from "./SectionHeading"

export default function Experience() {
  const experiences = [
    {
      period: "2021 - Presente",
      role: "Desarrollador Fullstack Freelance",
      company: "Proyectos Independientes",
      color: "indigo",
      type: "professional",
      projects: [
        {
          title: "🚀 Sistemas de Automatización Empresarial",
          description:
            "Desarrollo de más de 8 proyectos de automatización para empresas de envíos, exportaciones y retail. Implementación de workflows automatizados con n8n y sistemas de gestión personalizados.",
        },
        {
          title: "💼 Soluciones de Gestión Interna",
          description:
            "Creación de sistemas internos para optimización de procesos empresariales, incluyendo gestión de inventarios, seguimiento de envíos y automatización de reportes financieros.",
        },
        {
          title: "🤖 Integración de IA y LangChain",
          description:
            "Implementación de soluciones de inteligencia artificial utilizando LangChain y LangGraph para automatización de procesos de atención al cliente y análisis de datos empresariales.",
        },
      ],
    },
    {
      period: "2020 - 2021",
      role: "Especialista en Reparación de Hardware",
      company: "Servicios Técnicos Independientes",
      color: "blue",
      type: "professional",
      projects: [
        {
          title: "🔨 Diagnóstico y Reparación de Equipos",
          description:
            "Diagnóstico, reparación y mantenimiento de computadoras, laptops y equipos informáticos. Resolución de problemas de hardware y software para clientes particulares y pequeñas empresas.",
        },
        {
          title: "💻 Soporte Técnico Integral",
          description:
            "Prestación de servicios de soporte técnico, instalación de sistemas operativos, configuración de redes y asesoramiento en compra de equipos informáticos.",
        },
      ],
    },
    {
      period: "2021 - 2025",
      role: "Estudiante de Contabilidad y Finanzas",
      company: "Formación Académica",
      color: "violet",
      type: "education",
      projects: [
        {
          title: "📊 Fundamentos Empresariales",
          description:
            "Formación sólida en principios contables, análisis financiero y gestión empresarial. Base teórica que complementa el desarrollo de soluciones tecnológicas para negocios.",
        },
        {
          title: "💡 Visión Integral de Negocios",
          description:
            "Desarrollo de comprensión profunda de procesos empresariales, lo que permite crear soluciones tecnológicas más efectivas y alineadas con objetivos comerciales.",
        },
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-950 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Experiencia" />

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
                        Leadership
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {exp.projects.map((project, i) => (
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
