"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

export default function HybridRAGPage() {
  const blogPost = {
    slug: "hybrid-rag",
    title: "Hybrid RAG: Blend Offline Docs, Web, APIs, and Databases",
    excerpt:
      "Combine offline corpora with live web search, APIs, and databases via routing + merging. Boost freshness and coverage with controlled cost.",
    author: "William Marrero Masferrer",
    date: "2025-11-01",
    readTime: "14 min",
    category: "IA",
    tags: ["RAG", "Hybrid", "Web", "API", "DB"],
    content: [
      { type: "section", id: "tldr", title: "TL;DR", content: "Route queries to needed sources (offline, web, DB, APIs), merge and deduplicate, rerank, then synthesize with citations." },
      { type: "section", id: "problem", title: "Problem It Solves", isList: true, items: ["Static KBs go stale","Single source misses info","Need real-time (prices, weather)"] },
      { type: "section", id: "architecture", title: "Architecture", content: "Query Router → Sources (Offline/Web/DB/API) → Result Merger → Reranker → LLM" },
      { type: "section", id: "routing", title: "Routing", isList: true, items: ["Rule-based: heuristics for time/structured/location","ML-based: classifier outputs source probabilities","Always include offline as fallback"] },
      { type: "section", id: "merging", title: "Merging & Dedup", isList: true, items: ["Weighted by reliability","Semantic dedup (cos>0.92)","Rerank across sources"] },
      { type: "section", id: "partitioning", title: "Index Partitioning", isList: true, items: ["By source type (offline/web-cache/db)","By freshness (realtime/daily/weekly/archival)","By compliance (public/internal/confidential/regulated)"] },
      { type: "section", id: "benchmarks", title: "Benchmarks (Illustrative)", isList: true, items: ["+18% accuracy vs offline-only","+45% freshness score","~+800ms latency (parallel fetch)","3x cost—optimize via caching & budgets"] },
      { type: "section", id: "cost", title: "Cost Model (per 1000 queries)", isList: true, items: ["Offline corpus: ~$2","Web search: ~$50 (30% of queries @ $0.17)","DB queries: ~$1","APIs: ~$5","LLM generation: ~$8","Total: ~$66 (33x offline)"] },
      { type: "section", id: "opt-cost", title: "Optimized Cost", isList: true, items: ["Cache web 24h (−60%)","Tune routing to minimize web calls","Use cheaper APIs where possible","Optimized total: ~ $26 / 1000 queries"] },
      { type: "section", id: "security", title: "Security & Privacy", isList: true, items: ["Data isolation by compliance","Permission checks by source","No PII in web queries","Audit source access"] },
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://william-marrero.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://william-marrero.vercel.app/#blog" },
      { "@type": "ListItem", position: 3, name: blogPost.title, item: canonical },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [breadcrumbList, articleLd] }) }} />
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
            <motion.section key={section.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl font-bold text-white mb-3">{section.title}</h2>
              {section.content && <p className="text-slate-300">{section.content}</p>}
              {section.isList && (
                <ul className="list-disc list-outside ml-6 text-slate-300 space-y-2">
                  {section.items?.map((it: string) => (<li key={it}>{it}</li>))}
                </ul>
              )}
            </motion.section>
          ))}
        </motion.div>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Artículos relacionados</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/multi-source-rag" className="text-indigo-400 hover:text-indigo-300">Multi‑Source RAG</Link>
            <Link href="/blog/auto-rag" className="text-indigo-400 hover:text-indigo-300">Auto RAG</Link>
            <Link href="/blog/hierarchical-rag" className="text-indigo-400 hover:text-indigo-300">Hierarchical RAG</Link>
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
