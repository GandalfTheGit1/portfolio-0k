"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function AgenticRAGPage() {
  const blogPost = {
    slug: "agentic-rag",
    title: "Agentic RAG: Embedding RAG Within Deliberative AI Agents",
    excerpt:
      "Learn how to embed RAG within deliberative AI agents that autonomously plan their retrieval steps and refine answers through reasoning.",
    author: "Will",
    date: "2025-11-01",
    readTime: "15 min",
    category: "IA",
    tags: ["RAG", "Agents", "ReAct", "Autonomous", "Multi-Step"],
    content: [
      {
        type: "section",
        id: "tldr",
        title: "TL;DR",
        content:
          "Agentic RAG embeds RAG within a deliberative AI agent that plans its own retrieval steps. Use Cases: Dynamic, multi-step tasks like research assistants, coding helpers that fetch libraries/docs, planning tools, or any workflow where the query evolves. The agent iteratively refines its query, self-corrects, and uses external tools before finalizing the answer.",
      },
      {
        type: "section",
        id: "definition",
        title: "What Is Agentic RAG?",
        content:
          "Agentic RAG refers to adding AI agents that control retrieval. The LLM acts as a planner that decides when and what to retrieve, rather than having a fixed retrieval pipeline. It maintains memory of past answers and decides when to call retrievers or tools.",
      },
      {
        type: "section",
        id: "use-cases",
        title: "When to Use Agentic RAG",
        isList: true,
        items: [
          "Dynamic, multi-step research tasks where the query evolves.",
          "Coding assistants that fetch libraries and documentation on demand.",
          "Planning tools and multi-turn customer support scenarios.",
          "Any workflow where the AI needs to reason about what information is needed next.",
        ],
      },
      {
        type: "section",
        id: "workflow",
        title: "Building Agentic RAG in N8N",
        isOrdered: true,
        isList: true,
        items: [
          "Initialize the workflow with a prompt asking the LLM what information it needs.",
          "Use a Loop node to repeat the process.",
          "The LLM decides: Should I retrieve? Which tool should I use?",
          "Execute the appropriate API call or database query.",
          "Feed results back to the LLM with the question: What information do I need next?",
          "Use If/Switch nodes to route based on LLM reasoning.",
          "Continue until the LLM determines it has sufficient information to answer.",
        ],
      },
      {
        type: "section",
        id: "patterns",
        title: "Implementation Patterns",
        isList: true,
        items: [
          "ReAct (Reasoning + Acting): Agent thinks through steps, then acts.",
          "Chain-of-thought reasoning: Instruct system to retrieve via explicit reasoning.",
          "Tool-use agents: Maintain a toolkit and let the agent decide which to call.",
          "Memory-augmented agents: Track past queries and answers to avoid redundant retrievals.",
        ],
      },
      {
        type: "section",
        id: "strengths",
        title: "Strengths & Weaknesses",
        content:
          "Strengths: Highly flexible and autonomous, can iteratively refine queries, handles complex workflows by reasoning, can correct itself and adjust strategy. Weaknesses: Hard to control and debug, performance depends on agent reasoning, may loop indefinitely or go off-track, slower and costlier due to multiple steps, safety and sandboxing concerns.",
      },
      {
        type: "section",
        id: "metrics",
        title: "Metrics to Track",
        isList: true,
        items: [
          "Success rate on goals — did the agent answer correctly?",
          "Number of steps to solution — is it efficient?",
          "Time and cost per query — what's the overhead?",
          "Loop count — does it get stuck looping?",
          "Tool usage patterns — which retrievers/APIs does it favor?",
        ],
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
