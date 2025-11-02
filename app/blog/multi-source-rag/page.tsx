"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

export default function MultiSourceRAGPage() {
  const blogPost = {
    slug: "multi-source-rag",
    title: "Multi-Source RAG: Integrate Diverse Knowledge Bases and Modalities",
    excerpt:
      "Multi-Source RAG retrieves from several knowledge sources or modalities and fuses them to answer complex queries.",
    author: "William Marrero Masferrer",
    date: "2025-11-01",
    readTime: "13 min",
    category: "IA",
    tags: ["RAG", "Fusion", "Multimodal", "Benchmarks"],
    content: [
      { type: "section", id: "tldr", title: "TL;DR", content: "Query multiple sources in parallel (internal docs, web, databases, even images), then merge and reconcile evidence before generation." },
      { type: "section", id: "definition", title: "What Is Multi-Source RAG?", content: "Retrieval from multiple knowledge bases and/or modalities with fusion strategies to improve coverage and robustness." },
      {
        type: "section",
        id: "use-cases",
        title: "When to Use Multi-Source RAG",
        isList: true,
        items: [
          "Assistants that combine company docs with web results",
          "Cross-referencing tasks needing multiple repositories",
          "Image+text scenarios and heterogeneous data",
        ],
      },
      {
        type: "section",
        id: "workflow",
        title: "Building Multi-Source RAG in N8N",
        isOrdered: true,
        isList: true,
        items: [
          "Set up parallel retrieval nodes for each source",
          "Normalize and label results by source",
          "Merge candidates and optionally rerank with an LLM",
          "Prompt LLM to synthesize and reconcile conflicts",
        ],
      },
      { type: "section", id: "strengths", title: "Strengths & Weaknesses", content: "Strengths: improved coverage and bias mitigation. Weaknesses: higher complexity, potential inconsistencies, extra latency and cost." },
      {
        type: "section",
        id: "metrics",
        title: "Metrics to Track",
        isList: true,
        items: [
          "Synthesis quality and coherence",
          "Cross-source coverage and trust scoring",
          "Hallucination count and latency",
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
            <Link href="/blog/fusion-rag" className="text-indigo-400 hover:text-indigo-300">Fusion RAG</Link>
            <Link href="/blog/contextual-rag" className="text-indigo-400 hover:text-indigo-300">Contextual RAG</Link>
            <Link href="/blog/standard-rag" className="text-indigo-400 hover:text-indigo-300">Standard RAG</Link>
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
