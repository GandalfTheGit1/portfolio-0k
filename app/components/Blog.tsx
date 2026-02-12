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
      id: "economia-circular-industria",
      title: "Economía Circular en la Industria: De la Teoría a la Implementación",
      excerpt: "Mi experiencia como parte del proyecto CUBA CIRCULAR: implementando tecnologías alemanas para sostenibilidad industrial en Cuba.",
      date: "2025-01-31",
      category: "Finanzas",
      readTime: "10 min",
      tags: ["Sostenibilidad", "Economía Circular"],
      slug: "economia-circular-industria",
    },
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
      id: "feedback-based-rag",
      title: "Feedback-Based RAG: Self-Improving Retrieval with User Signals",
      excerpt: "Use explicit/implicit feedback to rerank, retrain, and continuously improve RAG quality.",
      date: "2025-11-01",
      category: "IA",
      readTime: "13 min",
      tags: ["RAG", "Feedback", "Rerank", "Optimization"],
      slug: "feedback-based-rag",
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
      excerpt: "Interactive RAG integrates retrieval into multi-turn conversations and adapts with user feedback.",
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
      excerpt: "Retrieve from several sources or modalities and fuse evidence to answer complex queries.",
      date: "2025-11-01",
      category: "IA",
      readTime: "13 min",
      tags: ["RAG", "Fusion", "Multimodal", "Benchmarks"],
      slug: "multi-source-rag",
    },
    {
      id: "adversarial-rag",
      title: "Adversarial RAG: Harden Your System Against Injection & Poisoning",
      excerpt: "Defend RAG against prompt injection, document poisoning, and exfiltration with layered defenses.",
      date: "2025-11-01",
      category: "IA",
      readTime: "14 min",
      tags: ["RAG", "Security", "Prompt Injection", "Poisoning"],
      slug: "adversarial-rag",
    },
    {
      id: "hierarchical-rag",
      title: "Hierarchical RAG: Top-Down Indexing for Large Corpora",
      excerpt: "Use multi-level indexes to narrow retrieval efficiently and preserve context across large corpora.",
      date: "2025-11-01",
      category: "IA",
      readTime: "12 min",
      tags: ["RAG", "Hierarchy", "Indexing", "Scaling"],
      slug: "hierarchical-rag",
    },
    {
      id: "multi-pass-rag",
      title: "Multi-Pass RAG: Iterative Retrieval That Boosts Accuracy",
      excerpt: "Run 2–3 retrieval→generation passes. First pass casts a wide net; later passes rerank and refine.",
      date: "2025-11-01",
      category: "IA",
      readTime: "12 min",
      tags: ["RAG", "Iteration", "Rerank", "Hybrid"],
      slug: "multi-pass-rag",
    },
    {
      id: "auto-rag",
      title: "Auto RAG: Self-Managing Ingestion, Indexing, and Optimization",
      excerpt:
        "Automate ingestion, smart chunking, deduplication, reindexing, and tuning to keep retrieval fresh and performant.",
      date: "2025-11-01",
      category: "IA",
      readTime: "14 min",
      tags: ["RAG", "Automation", "Indexing", "Tuning"],
      slug: "auto-rag",
    },
    {
      id: "hybrid-rag",
      title: "Hybrid RAG: Blend Offline Docs, Web, APIs, and Databases",
      excerpt:
        "Combine offline corpora with web, APIs, and databases via routing and merging to boost freshness and coverage.",
      date: "2025-11-01",
      category: "IA",
      readTime: "14 min",
      tags: ["RAG", "Hybrid", "Web", "API", "DB"],
      slug: "hybrid-rag",
    },
    {
      id: "realm",
      title: "REALM: Retrieval-Augmented Pretraining Explained (Practical Guide)",
      excerpt:
        "REALM jointly trains retriever + LM. Practical approximations: retrieval-augmented fine-tuning, frozen retrievers.",
      date: "2025-11-01",
      category: "IA",
      readTime: "15 min",
      tags: ["RAG", "REALM", "Pretraining", "Retriever"],
      slug: "realm",
    },
    {
      id: "raptor",
      title: "RAPTOR: Tree-Organized Retrieval with Recursive Summaries",
      excerpt: "Build hierarchical summaries and retrieve across levels for long documents and theme-based queries.",
      date: "2025-11-01",
      category: "IA",
      readTime: "14 min",
      tags: ["RAG", "RAPTOR", "Hierarchy", "Summarization"],
      slug: "raptor",
    },
    {
      id: "react-rag",
      title: "ReAct RAG: Reasoning + Acting with Tools and Retrieval",
      excerpt:
        "Interleave reasoning with retrieval/tool calls. Route, fetch, and verify step‑by‑step for complex queries.",
      date: "2025-11-01",
      category: "IA",
      readTime: "14 min",
      tags: ["RAG", "ReAct", "Agents", "Tools"],
      slug: "react-rag",
    },
    {
      id: "replug",
      title: "RePLUG: Retrieval for Black‑Box LLMs (Format and Plug)",
      excerpt:
        "Optimize retrieval selection and prompt packaging for closed LLMs. Improve utility without changing the model.",
      date: "2025-11-01",
      category: "IA",
      readTime: "13 min",
      tags: ["RAG", "RePLUG", "Black‑box", "Prompting"],
      slug: "replug",
    },
    {
      id: "atlas",
      title: "ATLAS: Large‑Scale Retrieval‑Augmented Pretraining",
      excerpt:
        "Jointly pretrain retriever + LM at scale to leverage external memory for few‑shot learning and robust recall.",
      date: "2025-11-01",
      category: "IA",
      readTime: "15 min",
      tags: ["RAG", "ATLAS", "Pretraining", "Retriever"],
      slug: "atlas",
    },
    {
      id: "reranking-rag",
      title: "Re-Ranking RAG: Two-Stage Retrieval for Maximum Relevance",
      excerpt:
        "Re-Ranking uses a specialized cross-encoder model to filter initial retrievals, keeping only the most relevant chunks for the LLM while maintaining context coverage.",
      date: "2025-11-01",
      category: "IA",
      readTime: "13 min",
      tags: ["RAG", "Re-ranking", "Cross-encoder", "Retrieval"],
      slug: "reranking-rag",
    },
    {
      id: "query-expansion",
      title: "Query Expansion: Reformulating Questions for Better Retrieval",
      excerpt:
        "Query Expansion uses an LLM to reformulate and enhance user queries before vector search, improving retrieval accuracy by adding relevant details and context.",
      date: "2025-11-01",
      category: "IA",
      readTime: "12 min",
      tags: ["RAG", "Query", "Expansion", "Preprocessing"],
      slug: "query-expansion",
    },
    {
      id: "late-chunking",
      title: "Late Chunking: Full-Document Context for Superior Embeddings",
      excerpt:
        "Late Chunking applies embeddings to the entire document first, then chunks the token embeddings, preserving document context in every chunk.",
      date: "2025-11-01",
      category: "IA",
      readTime: "15 min",
      tags: ["RAG", "Chunking", "Embeddings", "Advanced"],
      slug: "late-chunking",
    },
    {
      id: "knowledge-graphs",
      title: "Knowledge Graphs: Entity Relationships for Interconnected Retrieval",
      excerpt:
        "Knowledge Graphs combine vector search with graph databases to enable relationship-aware retrieval, perfect for interconnected data like entities, topics, and their connections.",
      date: "2025-11-01",
      category: "IA",
      readTime: "14 min",
      tags: ["RAG", "Knowledge Graphs", "Graph DB", "Entities"],
      slug: "knowledge-graphs",
    },
    {
      id: "fine-tuned-embeddings",
      title: "Fine-Tuned Embeddings: Domain-Specific Retrieval at Scale",
      excerpt:
        "Fine-tune embedding models on domain-specific data to achieve 5-10% accuracy gains, allowing smaller models to outperform generic ones in specialized tasks.",
      date: "2025-11-01",
      category: "IA",
      readTime: "14 min",
      tags: ["RAG", "Embeddings", "Fine-tuning", "ML"],
      slug: "fine-tuned-embeddings",
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

  const categories = ["IA", "Frontend", "Backend", "Base de Datos", "Automatización", "Startups", "Finanzas"]

  // Function to shuffle array
  const shuffleArray = (array: any[]) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const startupPosts: BlogPost[] = [
    {
      id: "7",
      title: "Consejos para Levantar tu Primera Ronda de Inversión",
      excerpt:
        "Guía práctica sobre cómo prepararse para levantar capital semilla. Errores comunes y qué buscan los inversores.",
      date: "2024-12-20",
      category: "Startups",
      readTime: "10 min",
      tags: ["fundraising", "startups", "inversión"],
      slug: "levantar-primera-ronda-inversion",
    },
    {
      id: "8",
      title: "MVP: Cómo Validar tu Idea de Negocio Rápidamente",
      excerpt:
        "Aprende a construir un Minimum Viable Product que te ayude a validar tu idea antes de invertir demasiados recursos.",
      date: "2024-12-18",
      category: "Startups",
      readTime: "9 min",
      tags: ["mvp", "startup", "validación"],
      slug: "mvp-validar-idea-negocio",
    },
    {
      id: "9",
      title: "De Solopreneur a Startup: Escalando tu Negocio",
      excerpt: "Transición del trabajo freelance a una startup con equipo. Cómo contratar y delegar efectivamente.",
      date: "2024-12-12",
      category: "Startups",
      readTime: "11 min",
      tags: ["equipo", "scaling", "gestión"],
      slug: "solopreneur-a-startup-escalando",
    },
  ]

  // Combine all posts
  const allBlogPosts = [...blogPosts, ...startupPosts]

  // Sort posts by date to get the most recent first
  const sortedPosts = allBlogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  // Find Fusion RAG post to be featured, fallback to most recent
  const featuredPost = sortedPosts.find(post => post.id === "fusion-rag") || sortedPosts[0]
  
  // Filter and get remaining posts (excluding featured)
  const filteredPosts = sortedPosts
    .filter((post) => {
      const matchesCategory = !activeCategory || post.category === activeCategory
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch && post.id !== featuredPost.id
    })
    .slice(0, 5) // Take 5 remaining posts to show 6 total

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
        <div className="space-y-8 mb-12">
          <AnimatePresence>
            {/* Featured Article */}
            {featuredPost && (!activeCategory || featuredPost.category === activeCategory) && 
              (!searchQuery || 
                featuredPost.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                featuredPost.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                featuredPost.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))) && (
              <motion.article
                key={`featured-${featuredPost.id}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md rounded-2xl border border-indigo-500/30 overflow-hidden hover:border-indigo-500/50 transition-all duration-300 relative"
              >
                {/* Featured Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
                    Featured Article
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Content Section */}
                  <div className="flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm font-semibold rounded-full border border-indigo-500/30">
                        {featuredPost.category}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-slate-300 text-lg mb-6 line-clamp-4">{featuredPost.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-6 text-sm text-slate-400">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(featuredPost.date)}
                        </span>
                        <span>{featuredPost.readTime}</span>
                      </div>

                      <motion.a
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Read Full Article <ArrowRight className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Visual Section */}
                  <div className="flex items-center justify-center">
                    <div className="w-full h-64 md:h-80 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl border border-indigo-500/20 flex items-center justify-center">
                      <BookOpen className="w-24 h-24 text-indigo-400/50" />
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Regular Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
