"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Cpu, Globe, ShoppingCart, Package, Bot, Sparkles, Smartphone } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { useI18n } from "@/app/components/I18nProvider"

type TranslationFunction = {
  (key: string): string;
  <T = any>(key: string, options: { returnObjects: true }): T;
}

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

interface Project {
  title: string;
  description: string;
  techStack: string;
  github?: string;
  demo?: string;
  icon: React.ReactNode;
  type: 'public' | 'private';
  category: string;
  featured?: boolean;
}

export default function Projects() {
  const { t } = useI18n() as { t: TranslationFunction };
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Get categories from translations
  const categories = [
    { id: "Web", label: t('projects.categories.web'), icon: <Globe className="w-4 h-4" /> },
    { id: "AI", label: t('projects.categories.ai'), icon: <Cpu className="w-4 h-4" /> },
    { id: "E-commerce", label: t('projects.categories.ecommerce'), icon: <ShoppingCart className="w-4 h-4" /> },
    { id: "Mobile", label: t('projects.categories.mobile'), icon: <Smartphone className="w-4 h-4" /> },
  ]

  // Get projects from translations with proper typing
  const projectsData = t<Array<Omit<Project, 'icon'>>>("projects.items", { returnObjects: true });

  // Ensure projects is an array and add icons
  const projects = Array.isArray(projectsData)
    ? projectsData.map((project) => ({
        ...project,
        icon: getProjectIcon(project.category, project.title),
      }))
    : [];

  function getProjectIcon(category: string, title: string) {
    switch (category) {
      case "Web":
        return <Globe className="w-6 h-6 text-blue-400" />
      case "AI":
        return <Bot className="w-6 h-6 text-cyan-400" />
      case "E-commerce":
        return title.includes("Mily")
          ? <ShoppingCart className="w-6 h-6 text-teal-400" />
          : <ShoppingCart className="w-6 h-6 text-orange-400" />
      case "Mobile":
        return <Smartphone className="w-6 h-6 text-pink-400" />
      default:
        return <Package className="w-6 h-6 text-blue-400" />
    }
  }

  const filteredProjects = activeCategory 
    ? projects.filter((project) => project.category === activeCategory) 
    : projects;

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
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
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
            <span>{t('projects.allProjects')}</span>
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
                      <div className="mt-auto pt-4 border-t border-slate-800">
                        <p className="text-sm text-slate-400 mb-3">{project.techStack}</p>
                        <div className="flex gap-3">
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                            >
                              {t('projects.viewDemo')}
                            </a>
                          )}
                          {project.github ? (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors"
                            >
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                              </svg>
                              {t('projects.viewCode')}
                            </a>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1.5 text-sm bg-slate-800 text-slate-400 rounded-md cursor-not-allowed">
                              {t('projects.privateProject')}
                            </span>
                          )}
                        </div>
                      </div>
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
