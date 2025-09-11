"use client"

import { motion } from "framer-motion"
import { Code, Database, Server, Brain, Clipboard, Settings } from "lucide-react"
import SectionHeading from "./SectionHeading"

// Particle animation component
const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-indigo-500/30"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default function About() {
  const skills = [
    {
      icon: <Code className="w-8 h-8 text-indigo-400" />,
      title: "Frontend",
      description: "React, Next.js, Tailwind CSS, JavaScript",
    },
    {
      icon: <Server className="w-8 h-8 text-blue-400" />,
      title: "Backend",
      description: "Nest.js, Node.js, APIs REST",
    },
    {
      icon: <Database className="w-8 h-8 text-violet-400" />,
      title: "Base de Datos",
      description: "Supabase, PostgreSQL, MongoDB",
    },
    {
      icon: <Brain className="w-8 h-8 text-fuchsia-400" />,
      title: "AI/Automatización",
      description: "LangChain, LangGraph, n8n, RAG",
    },
    {
      icon: <Clipboard className="w-8 h-8 text-sky-400" />,
      title: "Negocios",
      description: "Contabilidad, Finanzas, Gestión",
    },
    {
      icon: <Settings className="w-8 h-8 text-teal-400" />,
      title: "Otros",
      description: "React Native, Reparación Hardware",
    },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-900 to-slate-950 z-0"></div>
      <ParticleField />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Sobre Mí" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-indigo-500/20">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-full bg-indigo-500/20 mr-4">
                  <Brain className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Desarrollador Fullstack & Especialista en Automatización
                </h3>
              </div>

              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                Desarrollador Fullstack con experiencia en sistemas internos, automatización de procesos empresariales y
                reparación de equipos informáticos. Especializado en React, Next.js, Nest.js, Supabase y tecnologías de
                IA.
              </p>
              <p className="text-xl text-slate-300 leading-relaxed">
                Formación en Contabilidad y Finanzas con fuerte orientación a soluciones tecnológicas para negocios. Más
                de 8 proyectos desarrollados para gestión empresarial en áreas de envíos, exportaciones y retail.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-indigo-500/20 group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
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
