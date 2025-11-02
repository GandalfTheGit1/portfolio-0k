"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

export default function MultiPassRAGPage() {
  const blogPost = {
    slug: "multi-pass-rag",
    title: "Multi-Pass RAG: Iterative Retrieval That Boosts Accuracy",
    excerpt:
      "Run 2–3 retrieval→generation passes. First pass casts a wide net; later passes rerank and refine. Expect ~15–25% accuracy gain at modest extra cost.",
    author: "William Marrero Masferrer",
    date: "2025-11-01",
    readTime: "12 min",
    category: "IA",
    tags: ["RAG", "Iteration", "Rerank", "Hybrid"],
    content: [
      {
        type: "section",
        id: "tldr",
        title: "TL;DR",
        content:
          "Iterative retrieval–generation in 2–3 passes: coarse dense retrieval → rerank → fine hybrid retrieval → verify & stop on confidence.",
      },
      {
        type: "section",
        id: "definition",
        title: "What is Multi-Pass RAG?",
        content:
          "Multiple retrieval–generation cycles where each pass narrows scope and improves answer quality. Analogy: skim → deep read → cross‑reference.",
      },
      {
        type: "section",
        id: "when-to-use",
        title: "When to Use",
        isList: true,
        items: [
          "Multi‑hop or complex questions needing synthesis",
          "Single‑pass results are redundant or off‑topic",
          "High‑stakes answers where correctness matters",
        ],
      },
      {
        type: "section",
        id: "how-it-works",
        title: "How It Works",
        isList: true,
        items: [
          "Pass 1: Dense retrieval with large k, larger chunks for coverage",
          "Rerank: Cross‑encoder or heuristics to prune",
          "Pass 2: Hybrid BM25+dense, smaller k and smaller chunks",
          "Verify/Stop: Confidence threshold (e.g., 0.85) or max passes",
        ],
      },
      {
        type: "section",
        id: "practical-config",
        title: "Practical Configuration",
        isList: true,
        items: [
          "Chunks: 800–1500 tokens (pass 1), 200–500 tokens (pass 2+), 15–20% overlap",
          "Retrievers: Dense k=50–100 → Hybrid k=10–20",
          "Reranker: Cross‑encoder (e.g., ms‑marco MiniLM) threshold ~0.7",
          "Stop rule: confidence > 0.85 or passes ≥ 3",
        ],
      },
      {
        type: "section",
        id: "cost-latency",
        title: "Cost & Latency (Rule of Thumb)",
        isList: true,
        items: [
          "1‑pass: ~1.2s, ~2k tokens",
          "2‑pass: ~2.8s, ~3.8k tokens, +15–25% accuracy",
          "3‑pass: ~4.5s, ~5k+ tokens; diminishing returns",
        ],
      },
      {
        type: "section",
        id: "example-metrics",
        title: "Example Metrics (Illustrative)",
        isList: true,
        items: [
          "Hit@10: 60% → 78% (2‑pass) → 88% (3‑pass)",
          "Hallucination rate: 12% → 6% → 4%",
          "Citation coverage: 55% → 72% → 80%",
        ],
      },
      {
        type: "section",
        id: "risks",
        title: "Failure Modes & Guards",
        isList: true,
        items: [
          "Infinite loops → cap at 3–4 passes",
          "Error amplification → enforce citations & verification",
          "Cost creep → per‑session budgets",
          "Over‑narrowing → keep result diversity during rerank",
        ],
      },
      {
        type: "section",
        id: "n8n",
        title: "Minimal n8n Workflow",
        content:
          "HTTP In → Embed → Vector Query (k=50) → Code (rerank) → Vector Query (k=10) → Chat → Code (confidence) → IF (stop/loop).",
      },
      {
        type: "section",
        id: "use-cases",
        title: "Real‑World Fits",
        isList: true,
        items: [
          "Legal: precedents → clauses → citations",
          "Medical: symptoms → conditions → guidelines",
          "Support: topic → exact SOP step",
        ],
      },
    ],
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
  }

  const canonical = `https://william-marrero.vercel.app/blog/${blogPost.slug}`
  const ogImage = `https://william-marrero.vercel.app/og/${blogPost.slug}.png`

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://william-marrero.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://william-marrero.vercel.app/#blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blogPost.title,
        item: canonical,
      },
    ],
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blogPost.title,
    description: blogPost.excerpt,
    author: { "@type": "Person", name: blogPost.author },
    datePublished: blogPost.date,
    dateModified: blogPost.date,
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: blogPost.category,
    keywords: blogPost.tags.join(", "),
    image: ogImage,
  }

  return (
    <main className="bg-slate-950 min-h-screen pt-32">
      <Head>
        <title>{blogPost.title}</title>
        <meta name="description" content={blogPost.excerpt} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index,follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="William Marrero" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.title} />
        <meta name="twitter:description" content={blogPost.excerpt} />
        <meta name="twitter:image" content={ogImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [breadcrumbList, articleLd],
          }) }}
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

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{blogPost.title}</h1>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(blogPost.date)}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{blogPost.readTime}</span>
          </div>
        </header>

        <p className="text-slate-300 leading-relaxed mb-8">{blogPost.excerpt}</p>

        <motion.div className="space-y-10">
          {blogPost.content.map((section) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-3">{section.title}</h2>
              {section.content && <p className="text-slate-300">{section.content}</p>}
              {section.isList && (
                <ul className="list-disc list-outside ml-6 text-slate-300 space-y-2">
                  {section.items?.map((it: string) => (
                    <li key={it}>{it}</li>
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
            <Link href="/blog/standard-rag" className="text-indigo-400 hover:text-indigo-300">Standard RAG</Link>
            <Link href="/blog/hierarchical-rag" className="text-indigo-400 hover:text-indigo-300">Hierarchical RAG</Link>
            <Link href="/blog/fusion-rag" className="text-indigo-400 hover:text-indigo-300">Fusion RAG</Link>
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
