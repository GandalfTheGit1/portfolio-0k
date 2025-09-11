"use client"

import { motion } from "framer-motion"
import { Brain, Clock, CheckCircle, ExternalLink, Sparkles, Code, Database } from "lucide-react"
import SectionHeading from "./SectionHeading"

// Floating research particles
const ResearchParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-500/30"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 25 + 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Research paper card component
const ResearchCard = ({
  title,
  journal,
  description,
  status,
  icon: Icon,
  color,
  index,
}: {
  title: string
  journal: string
  description: string
  status: string
  icon: any
  color: string
  index: number
}) => {
  const colors = {
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-500/50",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-500/50",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:border-blue-500/50",
    green: "from-green-500/20 to-green-500/5 border-green-500/30 hover:border-green-500/50",
  }

  const bgColor = colors[color as keyof typeof colors] || colors.cyan

  return (
    <motion.div
      className={`bg-gradient-to-br ${bgColor} backdrop-blur-md p-6 rounded-xl border transition-all duration-300 hover:-translate-y-2 group shadow-lg h-full`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-full bg-slate-800 border border-slate-700 group-hover:bg-slate-700 transition-colors duration-300">
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-400" />
          <span className="text-xs text-orange-300 bg-orange-500/20 px-2 py-1 rounded-full border border-orange-500/30">
            {status}
          </span>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
        {title}
      </h3>

      <p className="text-slate-400 text-sm mb-4 font-mono">{journal}</p>

      <p className="text-slate-300 mb-6 leading-relaxed">{description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center text-green-400 text-sm">
          <CheckCircle className="w-4 h-4 mr-1" />
          <span>Implementado</span>
        </div>
        <div className="flex items-center text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Proyecto</span>
          <ExternalLink className="w-4 h-4 ml-1" />
        </div>
      </div>
    </motion.div>
  )
}

export default function Research() {
  const publications = [
    {
      title: "Automatización de Procesos Empresariales con IA",
      journal: "Proyectos de Sistemas Internos - Empresas de Envíos y Exportación",
      description:
        "Desarrollo e implementación de sistemas de automatización utilizando LangChain, n8n y tecnologías de IA para optimizar procesos empresariales. Incluye automatización de workflows, gestión de documentos y seguimiento de envíos internacionales con reducción del 70% en tiempo de procesamiento manual.",
      status: "Implementado",
      icon: Brain,
      color: "cyan",
    },
    {
      title: "Sistemas de Gestión Integral para Retail",
      journal: "Soluciones Tecnológicas Personalizadas - Sector Retail",
      description:
        "Creación de plataformas completas de gestión empresarial utilizando React, Next.js, Nest.js y Supabase. Sistemas que integran gestión de inventarios, análisis de ventas, automatización de reportes y dashboards en tiempo real para optimización de operaciones comerciales.",
      status: "En Producción",
      icon: Database,
      color: "purple",
    },
    {
      title: "Integración de IA en Atención al Cliente",
      journal: "Chatbots Inteligentes - Múltiples Sectores Empresariales",
      description:
        "Desarrollo de asistentes virtuales utilizando LangChain y LangGraph para automatización de atención al cliente. Implementación de procesamiento de lenguaje natural para resolución automática de consultas, reduciendo tiempo de respuesta en un 85% y mejorando satisfacción del cliente.",
      status: "Activo",
      icon: Code,
      color: "blue",
    },
  ]

  return (
    <section id="research" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-900 to-slate-950 z-0"></div>
      <ResearchParticles />

      {/* Neural network pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="currentColor" />
              <path
                d="M 30 30 L 60 0 M 30 30 L 60 60 M 30 30 L 0 0 M 30 30 L 0 60"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            title="Proyectos & Implementaciones"
            subtitle="Soluciones tecnológicas innovadoras para automatización y optimización empresarial"
          />
        </motion.div>

        {/* Research stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-slate-800/50 backdrop-blur-md p-4 rounded-xl border border-cyan-500/20 text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-1">8+</div>
            <div className="text-slate-300 text-sm">Proyectos Implementados</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-md p-4 rounded-xl border border-purple-500/20 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">3</div>
            <div className="text-slate-300 text-sm">Sectores Empresariales</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-md p-4 rounded-xl border border-green-500/20 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">70%</div>
            <div className="text-slate-300 text-sm">Reducción de Tiempo</div>
          </div>
        </motion.div>

        {/* Publications grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {publications.map((pub, index) => (
            <ResearchCard
              key={index}
              title={pub.title}
              journal={pub.journal}
              description={pub.description}
              status={pub.status}
              icon={pub.icon}
              color={pub.color}
              index={index}
            />
          ))}
        </div>

        {/* Research focus areas */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            Áreas de Especialización
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Automatización de Procesos",
              "Sistemas Internos",
              "Inteligencia Artificial",
              "Desarrollo Fullstack",
              "Gestión Empresarial",
              "Optimización de Workflows",
            ].map((area, index) => (
              <motion.span
                key={area}
                className="px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full text-slate-300 border border-slate-700 hover:border-cyan-500/50 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {area}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
