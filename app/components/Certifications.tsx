"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Award, CheckCircle, ExternalLink } from "lucide-react"
import SectionHeading from "./SectionHeading"

// Certificate card component
const CertificateCard = ({
  title,
  issuer,
  year,
  index,
}: {
  title: string
  issuer: string
  year: number
  index: number
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95])
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 2 : -2, index % 2 === 0 ? -2 : 2])

  return (
    <motion.div ref={cardRef} style={{ y, opacity, scale, rotate }} className="h-full">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-indigo-500/20 h-full shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 group">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-full bg-indigo-500/20">
            <Award className="w-6 h-6 text-indigo-400" />
          </div>
          <span className="text-indigo-400 font-mono">{year}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-400 mb-4">{issuer}</p>

        {/*<div className="flex items-center text-indigo-400 text-sm mt-auto">
          <CheckCircle className="w-4 h-4 mr-1" />
          <span>Verified</span>
          <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>*/}
      </div>
    </motion.div>
  )
}

// Floating particles animation
const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Predefined particle configurations to avoid hydration mismatch
  const particleConfigs = [
    { x: 28.4, y: 13.2, scale: 0.5, opacity: 0.75, duration: 25 },
    { x: 21.9, y: 89.7, scale: 0.5, opacity: 0.74, duration: 30 },
    { x: 74.8, y: 67.8, scale: 0.56, opacity: 0.73, duration: 35 },
    { x: 97.9, y: 16.3, scale: 0.83, opacity: 0.59, duration: 28 },
    { x: 41.1, y: 56.3, scale: 0.7, opacity: 0.44, duration: 32 },
    { x: 5.3, y: 80.5, scale: 0.75, opacity: 0.69, duration: 26 },
    { x: 3.5, y: 76.2, scale: 0.9, opacity: 0.35, duration: 29 },
    { x: 24.1, y: 42.2, scale: 0.6, opacity: 0.59, duration: 31 },
    { x: 2.8, y: 53.1, scale: 0.94, opacity: 0.63, duration: 27 },
    { x: 95.9, y: 67.5, scale: 0.89, opacity: 0.59, duration: 33 },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleConfigs.map((config, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-indigo-500/20"
          initial={{
            x: config.x + "%",
            y: config.y + "%",
            scale: config.scale,
            opacity: config.opacity,
          }}
          animate={{
            x: [
              config.x + "%",
              (config.x + 15) % 100 + "%",
              (config.x + 30) % 100 + "%",
              config.x + "%",
            ],
            y: [
              config.y + "%",
              (config.y + 25) % 100 + "%",
              (config.y + 50) % 100 + "%",
              config.y + "%",
            ],
            rotate: [0, 180, 360],
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

export default function Certifications() {
  const certifications = [
    {
      title: "AI Engineer",
      issuer: "Scrimba",
      year: 2024,
    },
    {
      title: "Design Thinking",
      issuer: "Cámara de Comercio de Bogotá",
      year: 2023,
    },
    {
      title: "Lic. en Contabilidad y Finanzas",
      issuer: "Universidad de La Habana",
      year: 2022,
    },
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <section id="certifications" className="py-20 relative overflow-hidden bg-slate-950" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-slate-900 to-slate-950 z-0"></div>
      <FloatingParticles />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div style={{ y: headerY, opacity: headerOpacity }}>
          <SectionHeading title="Certificaciones" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {certifications.map((cert, index) => (
            <CertificateCard key={index} title={cert.title} issuer={cert.issuer} year={cert.year} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
