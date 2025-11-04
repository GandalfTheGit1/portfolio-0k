"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

export default function ReRankingRAGPage() {
  const blogPost = {
    slug: "reranking-rag",
    title: "Re-Ranking RAG: Two-Stage Retrieval for Maximum Relevance",
    excerpt:
      "Re-Ranking uses a specialized cross-encoder model to filter initial retrievals, keeping only the most relevant chunks for the LLM while maintaining context coverage.",
    author: "William Marrero Masferrer",
    date: "2025-11-01",
    readTime: "13 min",
    category: "IA",
    tags: ["RAG", "Re-ranking", "Cross-encoder", "Retrieval"],
    content: [
      {
        type: "section",
        id: "tldr",
        title: "TL;DR",
        content:
          "Pull a large number of chunks from vector DB, use a cross-encoder to rank and filter them, and pass only the top few to the LLM. This is the first strategy to implement for almost every RAG system.",
      },
      {
        type: "section",
        id: "definition",
        title: "What Is Re-Ranking RAG?",
        content:
          "A two-stage retrieval process where a vector database returns many candidates, but a specialized reranker model (cross-encoder) identifies the most relevant ones before passing them to the LLM.",
      },
      {
        type: "section",
        id: "why-important",
        title: "Why Re-Ranking Matters",
        isList: true,
        items: [
          "Prevents LLM overwhelm: If you pass 20-50 chunks directly to the LLM, it gets confused and loses focus.",
          "Balances precision and context: You consider more knowledge without overwhelming the model.",
          "Minimal cost overhead: The reranker is cheaper than an LLM and only processes top candidates.",
          "Dramatically improves quality: Studies show re-ranking reduces hallucinations and improves answer accuracy.",
        ],
      },
      {
        type: "section",
        id: "use-cases",
        title: "When to Use Re-Ranking RAG",
        isList: true,
        items: [
          "Any production RAG system where accuracy matters",
          "Customer support or FAQ systems with large knowledge bases",
          "Research assistants and documentation search",
          "Any workflow where you need to balance broad context coverage with focused answers",
        ],
      },
      {
        type: "section",
        id: "workflow",
        title: "Building Re-Ranking RAG in N8N",
        isOrdered: true,
        isList: true,
        items: [
          "User submits a query",
          "Vector DB retrieval: Fetch 20-50 candidate chunks (high recall, lower precision)",
          "Reranker step: Use a cross-encoder to score each chunk against the query",
          "Filter: Keep only top 3-5 chunks (high precision)",
          "Generate: Pass filtered chunks to LLM with the query",
          "Return answer with citations",
        ],
      },
      {
        type: "section",
        id: "implementation",
        title: "Implementation Patterns",
        isList: true,
        items: [
          "Cohere Rerank API: Simple, production-ready reranker service",
          "Local cross-encoders: sentence-transformers library, runs on your infrastructure",
          "Reciprocal Rank Fusion (RRF): Combine multiple retrieval scores for better ranking",
          "BM25 + semantic hybrid: Use both sparse and dense retrievers, rerank results",
        ],
      },
      {
        type: "section",
        id: "strengths",
        title: "Strengths & Weaknesses",
        content:
          "Strengths: Simple to implement, dramatic accuracy gains, minimal latency addition, cost-effective. Weaknesses: Adds one extra API call, dependent on reranker quality, not a silver bullet for bad chunking.",
      },
      {
        type: "section",
        id: "metrics",
        title: "Metrics to Track",
        isList: true,
        items: [
          "Retrieval accuracy: Does the reranker select the correct chunks?",
          "Answer quality improvement vs baseline RAG",
          "Latency: How much does reranking add?",
          "Cost per query: Reranker expense vs accuracy gain",
          "Coverage: Are we missing edge cases?",
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
      <Head>
        <title>{blogPost.title}</title>
        <meta name="description" content={blogPost.excerpt} />
        <link rel="canonical" href={`https://william-marrero.vercel.app/blog/${blogPost.slug}`} />
      </Head>
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
          className="mt-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Artículos relacionados</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/standard-rag" className="text-indigo-400 hover:text-indigo-300">
              Standard RAG
            </Link>
            <Link href="/blog/contextual-rag" className="text-indigo-400 hover:text-indigo-300">
              Contextual RAG
            </Link>
            <Link href="/blog/agentic-rag" className="text-indigo-400 hover:text-indigo-300">
              Agentic RAG
            </Link>
          </div>
        </motion.section>

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
