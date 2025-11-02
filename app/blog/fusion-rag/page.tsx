"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function FusionRAGPage() {
  const blogPost = {
    slug: "fusion-rag",
    title: "Fusion RAG: Combining Multiple Data Sources for Smarter Retrieval",
    excerpt:
      "Fusion RAG merges multiple retrieval sources—vector, keyword, and API—to produce more comprehensive, bias-resistant answers.",
    author: "Will",
    date: "2025-11-01",
    readTime: "14 min",
    category: "IA",
    tags: ["RAG", "AI", "N8N", "Fusion", "Multi-Source"],
    content: [
      {
        type: "section",
        id: "tldr",
        title: "TL;DR",
        content:
          "Fusion RAG enhances standard retrieval-augmented generation by pulling evidence from multiple, heterogeneous data sources—vector databases, keyword search, APIs, and SQL queries—and merging them intelligently before answer generation.",
      },
      {
        type: "section",
        id: "definition",
        title: "What Is Fusion RAG?",
        content:
          "Fusion RAG fuses retrieved data from different systems (semantic search, keyword search, SQL, APIs) into a single ranked list of context snippets. The model then synthesizes an answer that reflects diverse perspectives — effectively ensembling retrieval.",
      },
      {
        type: "section",
        id: "use-cases",
        title: "When to Use Fusion RAG",
        isList: true,
        items: [
          "Finance: Merge market data, news feeds, analyst reports.",
          "Enterprise knowledge bases: Combine internal docs with public APIs or support portals.",
          "Scientific summarization: Blend structured (PubMed DB) and unstructured (arXiv PDFs) sources.",
        ],
      },
      {
        type: "section",
        id: "workflow",
        title: "Example N8N Workflow",
        isOrdered: true,
        isList: true,
        items: [
          "Parallel Retrieval Nodes: Vector Search node → semantic match from embeddings DB, HTTP Request node → keyword or external API results, Database node → structured query to SQL/Notion.",
          "Merge results with a Set or Merge node.",
          "Rerank results by relevance using a ChatGPT node or reranker model.",
          "Feed top-ranked docs to the LLM generator with labeled citations.",
        ],
      },
      {
        type: "section",
        id: "patterns",
        title: "Implementation Patterns",
        isList: true,
        items: [
          "Hybrid retrieval: combine semantic and keyword search via Reciprocal Rank Fusion.",
          "Multi-indexing: maintain several databases optimized for different query types.",
          "Fusion-in-Decoder (FiD): treat each document as a separate token sequence and fuse during decoding.",
        ],
      },
      {
        type: "section",
        id: "strengths",
        title: "Strengths & Weaknesses",
        content:
          "Strengths: Broader coverage across diverse data domains, reduces single-source bias and improves completeness, flexible architecture adaptable to different industries. Weaknesses: Complexity in data merging and scoring, possible noise or contradictions from multiple sources, higher latency due to multiple API calls.",
      },
    ],
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <main className="bg-slate-950 min-h-screen pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-950 z-0"></div>

      <article className="container mx-auto px-6 max-w-3xl relative z-10 pb-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link href="/#blog" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Volver al Blog
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">
              {blogPost.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">{blogPost.title}</h1>

          <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-400 mb-6">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(blogPost.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {blogPost.readTime}
              </span>
            </div>
            <span>por {blogPost.author}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag) => (
              <span key={tag} className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          {blogPost.content.map((section: any, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-6 font-display">{section.title}</h2>

              {section.content && <p className="text-lg text-slate-300 leading-relaxed mb-4">{section.content}</p>}

              {section.isList && (
                <ul className={section.isOrdered ? "list-decimal list-inside" : "list-disc list-inside"}>
                  {section.items.map((item: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-slate-300 mb-3 leading-relaxed"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border border-indigo-500/20 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4">¿Te gustó este artículo?</h2>
          <p className="text-slate-300 mb-6">Sígueme para más recursos sobre RAG y N8N workflows.</p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Contáctame
          </a>
        </motion.section>
      </article>
    </main>
  )
}
