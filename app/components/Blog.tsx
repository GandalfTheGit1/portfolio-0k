"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { BookOpen, Calendar, ArrowRight, Search } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { useI18n } from "@/app/components/I18nProvider"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  image?: string
  tags: string[]
  slug: string
}

export default function Blog() {
  const { t } = useI18n()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock blog posts - replace with real data from CMS/API
  const blogPosts: BlogPost[] = [
    {
      id: "standard-rag",
      title: "Standard RAG: The Foundation of Retrieval-Augmented Generation",
      excerpt:
        "Understand Standard RAG — the foundation of modern retrieval-augmented generation. Learn how to build it in N8N, where it shines, and its limitations.",
      date: "2025-11-01",
      category: "IA",
      readTime: "12 min",
      tags: ["RAG", "AI", "N8N", "LLM"],
      slug: "standard-rag",
    },
    {
      id: "fusion-rag",
      title: "Fusion RAG: Combining Multiple Data Sources for Smarter Retrieval",
      excerpt:
        "Fusion RAG merges multiple retrieval sources—vector, keyword, and API—to produce more comprehensive, bias-resistant answers.",
      date: "2025-11-01",
      category: "IA",
      readTime: "14 min",
      tags: ["RAG", "AI", "Multi-Source", "N8N"],
      slug: "fusion-rag",
    },
    {
      id: "corrective-rag",
      title: "Corrective RAG: Making LLMs Trustworthy Through Feedback Loops",
      excerpt:
        "Learn how Corrective RAG adds self-checking feedback loops to Retrieval-Augmented Generation workflows, reducing hallucinations and improving factual reliability.",
      date: "2025-11-01",
      category: "IA",
      readTime: "13 min",
      tags: ["RAG", "Verification", "Feedback", "LLM"],
      slug: "corrective-rag",
    },
    {
      id: "speculative-rag",
      title: "Speculative RAG: Speed and Accuracy with Specialist–Generalist LLMs",
      excerpt:
        "Learn how Speculative RAG uses a small and a large LLM together to balance latency, cost, and accuracy in retrieval-augmented systems.",
      date: "2025-11-01",
      category: "IA",
      readTime: "12 min",
      tags: ["RAG", "Performance", "LLM", "Optimization"],
      slug: "speculative-rag",
    },
    {
      id: "agentic-rag",
      title: "Agentic RAG: Embedding RAG Within Deliberative AI Agents",
      excerpt:
        "Learn how to embed RAG within deliberative AI agents that autonomously plan their retrieval steps and refine answers through reasoning.",
      date: "2025-11-01",
      category: "IA",
      readTime: "15 min",
      tags: ["RAG", "Agents", "ReAct", "Autonomous"],
      slug: "agentic-rag",
    },
    {
      id: "self-rag",
      title: "Self-RAG: Retrieve, Generate, Critique for Higher Factuality",
      excerpt:
        "Self-RAG lets the model decide when to retrieve and critique its output to improve factuality and control.",
      date: "2025-11-01",
      category: "IA",
      readTime: "14 min",
      tags: ["RAG", "Self-critique", "Reflection", "Verifier"],
      slug: "self-rag",
    },
    {
      id: "interactive-rag",
      title: "Interactive RAG: Conversational Retrieval for Live Assistants",
      excerpt:
        "Interactive RAG integrates retrieval into multi-turn conversations and adapts with user feedback.",
      date: "2025-11-01",
      category: "IA",
      readTime: "12 min",
      tags: ["RAG", "Chatbots", "Conversation", "Memory"],
      slug: "interactive-rag",
    },
    {
      id: "contextual-rag",
      title: "Contextual RAG: Context-Preserved Retrieval that Finds What Matters",
      excerpt:
        "Contextual RAG augments chunks with surrounding context and uses hybrid retrieval + reranking to boost accuracy.",
      date: "2025-11-01",
      category: "IA",
      readTime: "13 min",
      tags: ["RAG", "Contextual Embeddings", "Hybrid", "Rerank"],
      slug: "contextual-rag",
    },
    {
      id: "multi-source-rag",
      title: "Multi-Source RAG: Integrate Diverse Knowledge Bases and Modalities",
      excerpt:
        "Retrieve from several sources or modalities and fuse evidence to answer complex queries.",
      date: "2025-11-01",
      category: "IA",
      readTime: "13 min",
      tags: ["RAG", "Fusion", "Multimodal", "Benchmarks"],
      slug: "multi-source-rag",
    },
    {
      id: "hierarchical-rag",
      title: "Hierarchical RAG: Top-Down Indexing for Large Corpora",
      excerpt:
        "Use multi-level indexes to narrow retrieval efficiently and preserve context across large corpora.",
      date: "2025-11-01",
      category: "IA",
      readTime: "12 min",
      tags: ["RAG", "Hierarchy", "Indexing", "Scaling"],
      slug: "hierarchical-rag",
    },
    {
      id: "1",
      title: "Automatización de Procesos con LangChain",
      excerpt:
        "Aprende cómo utilizar LangChain para crear workflows automatizados y sistemas de IA que optimicen procesos empresariales.",
      date: "2024-12-15",
      category: "IA",
      readTime: "8 min",
      tags: ["langchain", "ai", "automatización"],
      slug: "automatizacion-de-procesos-con-langchain",
    },
    {
      id: "2",
      title: "Next.js 15: Las mejores prácticas",
      excerpt:
        "Explora las nuevas características de Next.js 15 y aprende las mejores prácticas para optimizar tu aplicación web.",
      date: "2024-12-10",
      category: "Frontend",
      readTime: "10 min",
      tags: ["nextjs", "react", "web development"],
      slug: "nextjs-15-mejores-practicas",
    },
    {
      id: "3",
      title: "Construir Sistemas Internos Escalables",
      excerpt:
        "Guía completa sobre cómo diseñar y desarrollar sistemas internos que crecen con tu negocio sin sacrificar la performance.",
      date: "2024-12-05",
      category: "Backend",
      readTime: "12 min",
      tags: ["sistemas internos", "arquitectura", "escalabilidad"],
      slug: "construir-sistemas-internos-escalables",
    },
    {
      id: "4",
      title: "Supabase vs Otras Soluciones de Base de Datos",
      excerpt: "Comparativa detallada de Supabase con otras plataformas de base de datos. ¿Cuándo usar cada una?",
      date: "2024-11-28",
      category: "Base de Datos",
      readTime: "9 min",
      tags: ["supabase", "postgresql", "base de datos"],
      slug: "supabase-vs-otras-soluciones",
    },
    {
      id: "5",
      title: "React Server Components: Futuro del Frontend",
      excerpt:
        "Descubre cómo los React Server Components están cambiando la forma en que construimos aplicaciones web modernas.",
      date: "2024-11-20",
      category: "Frontend",
      readTime: "11 min",
      tags: ["react", "server components", "innovación"],
      slug: "react-server-components-futuro-del-frontend",
    },
    {
      id: "6",
      title: "n8n: Automatización sin código",
      excerpt:
        "Cómo usar n8n para automatizar flujos de trabajo empresariales sin escribir código. Casos de uso reales.",
      date: "2024-11-15",
      category: "Automatización",
      readTime: "7 min",
      tags: ["n8n", "no-code", "workflows"],
      slug: "n8n-automatizacion-sin-codigo",
    },
  ]

  const categories = ["IA", "Frontend", "Backend", "Base de Datos", "Automatización"]

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = !activeCategory || post.category === activeCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <section id="blog" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-950 z-0"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blog-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blog-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Blog" subtitle="Artículos sobre desarrollo, IA y automatización" />

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-indigo-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              activeCategory === null ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-slate-900/80 backdrop-blur-md rounded-xl border border-indigo-500/20 overflow-hidden hover:border-indigo-500/40 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Category Badge */}
                  <div className="px-6 pt-6 pb-0">
                    <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-slate-800">
                      <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.date)}
                          </span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <motion.a
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium"
                        whileHover={{ x: 5 }}
                      >
                        Leer más <ArrowRight className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div className="col-span-full py-12 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No se encontraron artículos. Intenta con otra búsqueda.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
