"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Cpu, Globe, ShoppingCart, Package, Store, Bot, Sparkles, Smartphone } from "lucide-react"
import SectionHeading from "./SectionHeading"

// 3D Card effect component
const Card3D = ({ children }: { children: React.ReactNode }) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = (y - centerY) / 10
    const rotateYValue = (centerX - x) / 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className="h-full perspective-1000"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = [
    { id: "Web", label: "Aplicaciones Web", icon: <Globe className="w-4 h-4" /> },
    { id: "AI", label: "IA y Automatización", icon: <Cpu className="w-4 h-4" /> },
    { id: "E-commerce", label: "Comercio Electrónico", icon: <ShoppingCart className="w-4 h-4" /> },
    { id: "Mobile", label: "Móvil", icon: <Smartphone className="w-4 h-4" /> },
  ]

  const projects = [
    {
      title: "TRG - Sistema de Gestión de Envíos",
      description:
        "Sistema completo para gestión de envíos de contenedores desde EE.UU. hacia Cuba con automatización de procesos desde despacho hasta distribución final.",
      techStack: "Next.js, Material UI, PostgreSQL",
      link: "https://github.com/GandalfTheGit1/Cauto_StoreAdmin.git",
      icon: <Package className="w-6 h-6 text-blue-400" />,
      type: "github",
      category: "Web",
      featured: true,
    },
    {
      title: "Routule Print (Elstar)",
      description:
        "Plataforma para crear marketplaces e integración vertical de toda la cadena de valor. Facilita a tiendas minoristas crear su sistema sin programadores.",
      techStack: "Next.js, Tailwind CSS, Supabase",
      link: "#",
      icon: <Store className="w-6 h-6 text-indigo-400" />,
      type: "private",
      category: "E-commerce",
      featured: true,
    },
    {
      title: "Comercio Electrónico Mily Travel",
      description:
        "Plataforma de comercio electrónico especializada en servicios de viajes y turismo con sistema de reservas, gestión de paquetes turísticos y procesamiento de pagos integrado.",
      techStack: "React, Tailwind CSS, Nest.js",
      link: "https://github.com/GandalfTheGit1/milyTravelFront2.git",
      icon: <ShoppingCart className="w-6 h-6 text-teal-400" />,
      type: "github",
      category: "E-commerce",
    },
    {
      title: "Maranatha - Sistema de Gestión",
      description:
        "Sistema integral de gestión de ventas, mensajería e inventario para tienda de regalos y misceláneas con integración de pagos.",
      techStack: "Next.js, Tailwind CSS, Supabase",
      link: "#",
      icon: <Store className="w-6 h-6 text-green-400" />,
      type: "private",
      category: "Web",
    },
    {
      title: "Perxins - Eventos La Habana",
      description:
        "Aplicación web para visualizar eventos en La Habana: cines, teatros, fiestas, conciertos y actividades de entretenimiento. PWA con despliegue en AWS.",
      techStack: "React, Nest.js, MongoDB, PWA, AWS EC2",
      link: "https://github.com/GandalfTheGit1/PerxinsFront.git",
      icon: <Globe className="w-6 h-6 text-violet-400" />,
      type: "github",
      category: "Web",
    },
    {
      title: "SOS Combo - E-commerce",
      description:
        "Tienda de comercio electrónico para agencia de envíos a Cuba desde EE.UU. con catálogo de productos y panel de administración.",
      techStack: "React, JavaScript, CSS, HTML",
      link: "https://sos-combos.vercel.app/",
      icon: <ShoppingCart className="w-6 h-6 text-orange-400" />,
      type: "demo",
      category: "E-commerce",
    },
    {
      title: "AI Bot con RAG",
      description:
        "Bot inteligente conectado a base de datos utilizando LangChain y LangGraph para recuperación aumentada de información con automatización de flujos.",
      techStack: "LangChain, LangGraph, n8n",
      link: "https://github.com/GandalfTheGit1/accounting-chatbot.git",
      icon: <Bot className="w-6 h-6 text-cyan-400" />,
      type: "github",
      category: "AI",
      featured: true,
    },
    {
      title: "Poinger - Mejoras Web",
      description:
        "Mejoras en página web empresarial para catálogo de productos con resolución de errores y optimización del sitio.",
      techStack: "PHP, MySQL",
      link: "#",
      icon: <Globe className="w-6 h-6 text-yellow-400" />,
      type: "private",
      category: "Web",
    },
    {
      title: "Proyecto React Native",
      description:
        "Aplicación móvil en desarrollo para complementar el ecosistema web. Proyecto de aprendizaje y expansión hacia plataformas móviles.",
      techStack: "React Native, TypeScript",
      link: "#",
      icon: <Smartphone className="w-6 h-6 text-pink-400" />,
      type: "private",
      category: "Mobile",
    },
  ]

  const filteredProjects = activeCategory ? projects.filter((project) => project.category === activeCategory) : projects

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-slate-900 to-slate-950 z-0"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Proyectos"
          subtitle="Explora mi portafolio de aplicaciones web, soluciones de IA y herramientas de desarrollo"
        />

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
              activeCategory === null ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Todos los Proyectos</span>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card3D>
                  {/* Card with 3D effect */}
                  <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-indigo-500/20 h-full flex flex-col overflow-hidden relative">
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-2 py-1 bg-indigo-500/20 backdrop-blur-sm rounded-full text-xs text-indigo-300 flex items-center gap-1 border border-indigo-500/30 z-10">
                        <Sparkles className="w-3 h-3" />
                        <span>Destacado</span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-full bg-slate-800 mr-4 border border-indigo-500/20">
                          {project.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white font-display">{project.title}</h3>
                      </div>

                      <p className="text-slate-300 mb-4">{project.description}</p>
                      <p className="text-sm text-slate-400 mb-6 mt-auto font-mono">{project.techStack}</p>

                      {project.type === "github" ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300"
                        >
                          <span>Ver en GitHub</span>
                        </a>
                      ) : project.type === "demo" ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors duration-300"
                        >
                          <span>Ver Demo</span>
                        </a>
                      ) : (
                        <div className="inline-flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-slate-600 text-slate-300 cursor-not-allowed">
                          <span>Proyecto Privado</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
