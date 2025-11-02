"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function CorrectiveRAGPage() {
  const blogPost = {
    slug: "corrective-rag",
    title: "Corrective RAG: Making LLMs Trustworthy Through Feedback Loops",
    excerpt:
      "Learn how Corrective RAG adds self-checking feedback loops to Retrieval-Augmented Generation workflows, reducing hallucinations and improving factual reliability.",
    author: "Will",
    date: "2025-11-01",
    readTime: "13 min",
    category: "IA",
    tags: ["RAG", "Verification", "Feedback", "LLM", "Accuracy"],
    content: [
      {
        type: "section",
        id: "tldr",
        title: "TL;DR",
        content:
          "Corrective RAG introduces a self-verification step in retrieval-augmented generation systems. It uses a second LLM pass to validate that the generated output is actually supported by the retrieved sources — dramatically reducing hallucinations in domains where precision matters.",
      },
      {
        type: "section",
        id: "definition",
        title: "What Is Corrective RAG?",
        content:
          "Corrective RAG (CRAG) is a variation of the standard Retrieval-Augmented Generation architecture that adds a feedback or correction loop to verify the model's own responses against the sources retrieved.",
      },
      {
        type: "section",
        id: "use-cases",
        title: "When and Why to Use Corrective RAG",
        isList: true,
        items: [
          "Legal research: validating case references and precedents.",
          "Financial and compliance tools: confirming that advice aligns with verified data.",
          "Healthcare/medical apps: ensuring generated content matches verified studies.",
          "Enterprise knowledge bases: filtering outdated or irrelevant docs automatically.",
        ],
      },
      {
        type: "section",
        id: "workflow",
        title: "Implementation in N8N",
        isOrdered: true,
        isList: true,
        items: [
          "Retrieve documents from your vector database.",
          "Generate an initial answer using ChatGPT node.",
          "Verify using a second ChatGPT node to check if answer is fully supported.",
          "Add an If node: if verification = unsupported, route to another retrieval with expanded query.",
          "Optional: Filter low-scoring documents via LLM evaluation before regenerating.",
        ],
      },
      {
        type: "section",
        id: "patterns",
        title: "Implementation Patterns",
        isList: true,
        items: [
          "Partition retrieved text into knowledge strips and score each for relevance.",
          "Use a smaller retriever evaluator (LLM or embedding model) to grade documents.",
          "Trigger secondary retrieval only when confidence falls below threshold.",
          "Optionally integrate web search APIs (Tavily or Bing Search) when no relevant context found.",
        ],
      },
      {
        type: "section",
        id: "strengths",
        title: "Strengths & Weaknesses",
        content:
          "Strengths: Significantly lowers hallucination rate in high-stakes use cases, explicitly verifies factual grounding using retrieved data, compatible with any standard RAG pipeline. Weaknesses: Increased latency from extra API calls and loops, more complex control flow, verifier accuracy depends on prompt design and LLM version.",
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
