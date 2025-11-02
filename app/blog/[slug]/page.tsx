"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Blog post data - in production, fetch from CMS/API
  const blogPost = {
    slug: "standard-rag",
    title: "Standard RAG: The Foundation of Retrieval-Augmented Generation",
    excerpt:
      "Understand Standard RAG — the foundation of modern retrieval-augmented generation. Learn how to build it in N8N, where it shines, and its limitations.",
    author: "Will",
    date: "2025-11-01",
    readTime: "12 min",
    category: "IA",
    tags: ["RAG", "AI", "N8N", "LLM", "Vector Database"],
    content: [
      {
        type: "section",
        id: "tldr",
        title: "TL;DR",
        content:
          "Standard RAG combines an LLM with a vector database to answer questions grounded in external data. It's the backbone of AI systems that require factual accuracy — from chatbots to research assistants. In this post, you'll learn what it is, how to build it in N8N, and when it makes sense to use it.",
      },
      {
        type: "section",
        id: "definition",
        title: "What Is Standard RAG?",
        content:
          "Retrieval-Augmented Generation (RAG) is a technique that allows a language model to fetch information from a database before generating an answer. Instead of relying purely on what the model 'knows,' it pulls relevant context from an external source. This makes it ideal for any scenario where accuracy and freshness matter — such as customer support, knowledge bases, legal or medical question answering, and academic research.",
      },
      {
        type: "section",
        id: "use-cases",
        title: "Practical Use Cases",
        isList: true,
        items: [
          "Customer support chatbots: connect to documentation or ticket histories to deliver factual, context-aware replies.",
          "Internal knowledge assistants: let employees query company wikis or policy documents in natural language.",
          "Research copilots: pull scientific data or market reports on demand.",
          "Legal & compliance tools: ground outputs in trusted document repositories.",
        ],
      },
      {
        type: "section",
        id: "n8n-implementation",
        title: "Building a Standard RAG Workflow in N8N",
        isList: true,
        isOrdered: true,
        items: [
          "Document preparation: Split and chunk documents using a Function node or a pre-processing script.",
          "Vectorization: Embed chunks with OpenAI, Hugging Face, or local embeddings model.",
          "Storage: Push embeddings into a vector database (Chroma, Pinecone, Weaviate) using an HTTP Request node.",
          "Retrieval: When a user submits a query, embed it and perform a top-K vector search via API.",
          "Generation: Combine query + retrieved text (Set node) → feed to an LLM node (e.g., OpenAI Chat).",
          "Output: Return the generated answer, and optionally log it for evaluation or feedback tuning.",
        ],
        cta: "👉 Download the N8N example workflow",
      },
      {
        type: "section",
        id: "architecture",
        title: "Architecture & Process Flow",
        content:
          "The Standard RAG follows a retrieve-then-generate pipeline: Text Source → Chunking → Embedding → Vector DB → Query Embedding → Similarity Search → Top-K Context → LLM Generation. This pipeline can be enhanced by hybrid retrieval (combining semantic + keyword search) and context filtering to control prompt size.",
      },
      {
        type: "section",
        id: "strengths",
        title: "Strengths",
        isList: true,
        items: [
          "Grounds responses in real, external data — reduces hallucinations.",
          "Updates knowledge without retraining the model.",
          "Adaptable: works across industries and data types.",
          "Scalable — new data can be indexed as your corpus grows.",
        ],
      },
      {
        type: "section",
        id: "weaknesses",
        title: "Weaknesses & Trade-Offs",
        isList: true,
        items: [
          "Quality depends heavily on retrieval precision. Irrelevant chunks lead to weak answers.",
          "Index maintenance is critical — stale data creates misinformation.",
          "Context window limits: too many retrieved chunks can overflow the model's input.",
          "Latency increases with large vector stores or complex pipelines.",
        ],
      },
      {
        type: "section",
        id: "example",
        title: "Example: Company Knowledge Assistant",
        content:
          "Imagine a mid-size SaaS company wants an AI assistant that answers questions about their product. They store documentation in Notion and export it weekly to Markdown. Result: 10× faster internal answers and 60% reduction in repeated support tickets.",
      },
      {
        type: "section",
        id: "faq",
        title: "FAQ",
        faqItems: [
          {
            question: "Is Standard RAG enough for production?",
            answer:
              "Yes, if your use case has clean, reliable data and the retrieval quality is high. For dynamic or multi-source data, you may need advanced RAG variants like Fusion or Multi-Source RAG.",
          },
          {
            question: "How often should I reindex my data?",
            answer:
              "Weekly for static corpora, daily for high-change environments like customer support knowledge bases.",
          },
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
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-950 z-0"></div>

      <article className="container mx-auto px-6 max-w-3xl relative z-10 pb-20">
        {/* Back button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link href="/#blog" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Volver al Blog
          </Link>
        </motion.div>

        {/* Header */}
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

        {/* Content */}
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

              {section.isList && !section.faqItems && (
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

              {section.faqItems && (
                <div className="space-y-4">
                  {section.faqItems.map((faq: any, i: number) => (
                    <motion.details
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group bg-slate-800/50 border border-indigo-500/20 rounded-lg p-4 cursor-pointer hover:border-indigo-500/40 transition-colors"
                    >
                      <summary className="font-semibold text-white flex items-center justify-between">
                        {faq.question}
                        <span className="text-indigo-400 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="text-slate-300 mt-3">{faq.answer}</p>
                    </motion.details>
                  ))}
                </div>
              )}
            </motion.section>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border border-indigo-500/20 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4">¿Te gustó este artículo?</h2>
          <p className="text-slate-300 mb-6">
            Sígueme en mis redes o comparte tus preguntas sobre RAG. Tengo más recursos y templates de N8N disponibles.
          </p>
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
