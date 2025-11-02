"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function SpeculativeRAGPage() {
  const blogPost = {
    slug: "speculative-rag",
    title: "Speculative RAG: Speed and Accuracy with Specialist–Generalist LLMs",
    excerpt:
      "Learn how Speculative RAG uses a small and a large LLM together to balance latency, cost, and accuracy in retrieval-augmented systems.",
    author: "Will",
    date: "2025-11-01",
    readTime: "12 min",
    category: "IA",
    tags: ["RAG", "Performance", "LLM", "Optimization", "Speculative Decoding"],
    content: [
      {
        type: "section",
        id: "tldr",
        title: "TL;DR",
        content:
          "Speculative RAG pairs a smaller, faster specialist LLM with a larger, more capable generalist LLM. The small model drafts answers across subsets of retrieved documents, and the large model verifies or fuses them into one final, accurate response. The result: faster generation, lower cost per token, and improved reliability.",
      },
      {
        type: "section",
        id: "definition",
        title: "What Is Speculative RAG?",
        content:
          "Speculative RAG is an advanced RAG framework where two models collaborate. A lightweight specialist generates draft answers from document subsets, while a larger generalist verifies and refines the output. The technique originates from Google's speculative decoding research.",
      },
      {
        type: "section",
        id: "use-cases",
        title: "When to Use Speculative RAG",
        isList: true,
        items: [
          "Scientific and technical QA — literature review, patent search, troubleshooting.",
          "Customer support automation — fast initial answers validated by a stronger LLM.",
          "Document summarization — smaller model drafts summaries, larger model ensures accuracy.",
        ],
      },
      {
        type: "section",
        id: "workflow",
        title: "Example N8N Workflow",
        isOrdered: true,
        isList: true,
        items: [
          "Retrieve documents via vector search (Supabase, Pinecone, etc.).",
          "Split or cluster results using a Function node (KMeans or simple batching).",
          "Parallel branches — each batch sent to a smaller LLM node (GPT-3.5-turbo-mini) to generate draft.",
          "Merge drafts using a Merge node.",
          "Verification pass — send all drafts to larger LLM (GPT-4 or Claude 3) for final answer synthesis.",
        ],
      },
      {
        type: "section",
        id: "patterns",
        title: "Implementation Patterns",
        isList: true,
        items: [
          "Cluster retrieval outputs → run small LLMs independently per cluster.",
          "Use generalist LLM for cross-draft comparison and synthesis.",
          "Evaluate confidence using consistency or citation matching in the prompt.",
        ],
      },
      {
        type: "section",
        id: "strengths",
        title: "Strengths & Weaknesses",
        content:
          "Strengths: Up to 50% lower latency through parallel execution, improved factual robustness via multiple perspectives, cheaper overall for large query loads. Weaknesses: Pipeline complexity and orchestration between two models, degraded output if small model drafts are poor, increased maintenance burden.",
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
          {blogPost.content.map((section: any) => (
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
