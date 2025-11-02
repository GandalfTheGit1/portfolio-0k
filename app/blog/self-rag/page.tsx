"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

export default function SelfRAGPage() {
  const blogPost = {
    slug: "self-rag",
    title: "Self-RAG: Retrieve, Generate, Critique for Higher Factuality",
    excerpt:
      "Self-RAG trains or prompts an LM to decide when to retrieve and to self-critique its outputs, improving factuality and control.",
    author: "William Marrero Masferrer",
    date: "2025-11-01",
    readTime: "14 min",
    category: "IA",
    tags: ["RAG", "Self-critique", "Reflection", "Verifier"],
    content: [
      { type: "section", id: "tldr", title: "TL;DR", content: "Self-RAG lets the model decide when to retrieve and when to critique its own outputs, reducing hallucinations via explicit reflection and control tokens/prompting." },
      { type: "section", id: "definition", title: "What Is Self-RAG?", content: "A single LM (or orchestrated prompts) that interleaves retrieval and self-critique using special tokens or structured steps, adapting to the query on the fly." },
      {
        type: "section",
        id: "use-cases",
        title: "When to Use Self-RAG",
        isList: true,
        items: [
          "Factual report writing and long-form educational content",
          "Systems needing explicit citation checks",
          "Iterative summarization and refinement tasks",
        ],
      },
      {
        type: "section",
        id: "workflow",
        title: "Simulating Self-RAG in N8N",
        isOrdered: true,
        isList: true,
        items: [
          "Generate an initial answer (OpenAI node)",
          "Run a critique step: ‘Is the answer fully supported by sources?’",
          "If low confidence, trigger additional retrieval and regenerate",
          "Optionally mark segments with <retrieve>/<critique> style tokens",
        ],
      },
      { type: "section", id: "strengths", title: "Strengths & Weaknesses", content: "Strengths: adaptive retrieval and self-correction; improved factuality and controllable behavior. Weaknesses: complex design; may require custom training; higher latency and orchestration cost." },
      {
        type: "section",
        id: "metrics",
        title: "Metrics to Track",
        isList: true,
        items: [
          "Factuality scores and citation precision",
          "Answer accuracy vs baseline RAG",
          "Additional latency/cost from critique steps",
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
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:url" content={`https://william-marrero.vercel.app/blog/${blogPost.slug}`} />
        <meta property="og:image" content={`https://william-marrero.vercel.app/og/${blogPost.slug}.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.title} />
        <meta name="twitter:description" content={blogPost.excerpt} />
        <meta name="twitter:image" content={`https://william-marrero.vercel.app/og/${blogPost.slug}.png`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: blogPost.title,
              description: blogPost.excerpt,
              author: { "@type": "Person", name: blogPost.author },
              datePublished: blogPost.date,
              dateModified: blogPost.date,
              url: `https://william-marrero.vercel.app/blog/${blogPost.slug}`,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://william-marrero.vercel.app/blog/${blogPost.slug}`,
              },
            }),
          }}
        />
      </Head>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-950 z-0"></div>

      <article className="container mx-auto px-6 max-w-3xl relative z-10 pb-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link href="/#blog" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Volver al Blog
          </Link>
        </motion.div>

        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">{blogPost.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">{blogPost.title}</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-400 mb-6">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(blogPost.date)}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{blogPost.readTime}</span>
            </div>
            <span>por {blogPost.author}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag) => (
              <span key={tag} className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">#{tag}</span>
            ))}
          </div>
        </motion.header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="prose prose-invert max-w-none">
          {blogPost.content.map((section: any) => (
            <motion.section key={section.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 font-display">{section.title}</h2>
              {section.content && <p className="text-lg text-slate-300 leading-relaxed mb-4">{section.content}</p>}
              {section.isList && (
                <ul className={section.isOrdered ? "list-decimal list-inside" : "list-disc list-inside"}>
                  {section.items.map((item: string, i: number) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-slate-300 mb-3 leading-relaxed">{item}</motion.li>
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
            <Link href="/blog/agentic-rag" className="text-indigo-400 hover:text-indigo-300">Agentic RAG</Link>
            <Link href="/blog/corrective-rag" className="text-indigo-400 hover:text-indigo-300">Corrective RAG</Link>
            <Link href="/blog/contextual-rag" className="text-indigo-400 hover:text-indigo-300">Contextual RAG</Link>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16 p-8 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border border-indigo-500/20 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-4">¿Te gustó este artículo?</h2>
          <p className="text-slate-300 mb-6">Sígueme para más recursos sobre RAG y N8N workflows.</p>
          <a href="#contact" className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">Contáctame</a>
        </motion.section>
      </article>
    </main>
  )
}
