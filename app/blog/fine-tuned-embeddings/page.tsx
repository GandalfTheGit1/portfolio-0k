"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

export default function FineTunedEmbeddingsPage() {
  const blogPost = {
    slug: "fine-tuned-embeddings",
    title: "Fine-Tuned Embeddings: Domain-Specific Retrieval at Scale",
    excerpt:
      "Fine-tune embedding models on domain-specific data to achieve 5-10% accuracy gains, allowing smaller models to outperform generic ones in specialized tasks.",
    author: "William Marrero Masferrer",
    date: "2025-11-01",
    readTime: "14 min",
    category: "IA",
    tags: ["RAG", "Embeddings", "Fine-tuning", "ML"],
    content: [
      {
        type: "section",
        id: "tldr",
        title: "TL;DR",
        content:
          "Fine-tune embedding models on domain-specific data to specialize similarity matching. Results: 5-10% accuracy gains, smaller models outperforming generic ones, customizable similarity (e.g., sentiment-based vs semantic).",
      },
      {
        type: "section",
        id: "definition",
        title: "What Are Fine-Tuned Embeddings?",
        content:
          "Standard embedding models are trained on general data. Fine-tuning adapts these models to your specific domain, allowing them to understand your data's nuances better.",
      },
      {
        type: "section",
        id: "use-cases",
        title: "When to Use Fine-Tuned Embeddings",
        isList: true,
        items: [
          "Legal or medical domains with specialized vocabulary",
          "Sentiment-based similarity instead of semantic similarity",
          "Large datasets where accuracy gains justify training cost",
          "Custom similarity metrics (e.g., code functionality matching, not just semantic)",
        ],
      },
      {
        type: "section",
        id: "example",
        title: "Example: Sentiment vs Semantic",
        content:
          "With generic embeddings: 'my order was late' is similar to 'shipping was fast' (both about orders). With fine-tuned embeddings trained on sentiment: 'my order was late' is similar to 'items are always sold out' (both are negative). You control the similarity metric.",
      },
      {
        type: "section",
        id: "workflow",
        title: "Building Fine-Tuned Embeddings",
        isOrdered: true,
        isList: true,
        items: [
          "Gather domain-specific training data (ideally 1000+ examples)",
          "Create pairs: (query, relevant_document) and (query, irrelevant_document)",
          "Fine-tune an open-source embedding model (e.g., sentence-transformers)",
          "Evaluate on a test set and iterate",
          "Deploy fine-tuned model as a custom embedding service",
          "Index and retrieve using the fine-tuned embeddings",
        ],
      },
      {
        type: "section",
        id: "strengths",
        title: "Strengths & Weaknesses",
        content:
          "Strengths: significant accuracy gains in specialized domains, can customize similarity metrics, smaller models can compete with large ones. Weaknesses: requires labeled training data, ongoing maintenance, infrastructure complexity, not practical for most use cases.",
      },
      {
        type: "section",
        id: "metrics",
        title: "Metrics to Track",
        isList: true,
        items: [
          "MRR (Mean Reciprocal Rank): Position of first relevant result",
          "NDCG (Normalized Discounted Cumulative Gain): Quality of ranking",
          "Accuracy gains vs baseline embeddings",
          "Training cost vs retrieval accuracy improvement ROI",
        ],
      },
      {
        type: "section",
        id: "golden-nugget",
        title: "The Golden Nugget",
        content:
          "If you're only going to implement 3-5 RAG strategies, combine: Re-ranking + Agentic RAG + Context-Aware Chunking (Hybrid RAG with Dockling). This combination gives you the best bang for your buck for most use cases. Fine-tuned embeddings is a nice-to-have for large-scale systems.",
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
            <Link href="/blog/reranking-rag" className="text-indigo-400 hover:text-indigo-300">
              Re-Ranking RAG
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
