"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

export default function AutoRAGPage() {
  const blogPost = {
    slug: "auto-rag",
    title: "Auto RAG: Self-Managing Ingestion, Indexing, and Optimization",
    excerpt:
      "Automate ingestion, smart chunking, deduplication, reindexing, and tuning. Keep retrieval fresh and performant with minimal ops.",
    author: "William Marrero Masferrer",
    date: "2025-11-01",
    readTime: "14 min",
    category: "IA",
    tags: ["RAG", "Automation", "Indexing", "Tuning"],
    content: [
      { type: "section", id: "tldr", title: "TL;DR", content: "Auto-detect changes, ingest and smart-chunk, deduplicate, rebuild indexes on schedule or metric drops, and auto-tune k/chunk/thresholds." },
      { type: "section", id: "problem", title: "Problem It Solves", isList: true, items: ["Manual index ops are slow/expensive","Stale KB lowers answer quality","Degrading performance without monitoring"] },
      { type: "section", id: "architecture", title: "Architecture", content: "Sources → Change Detection → Auto-Ingestion → Smart Chunking → Deduplication → Index Mgmt → Auto-Tuning → Monitoring" },
      { type: "section", id: "ingestion", title: "Ingestion & Dedup", isList: true, items: ["Parsers per type (.pdf, .docx, .html)","Exact hash + MinHash + semantic duplicate removal","Batch updates during off-peak"] },
      { type: "section", id: "change-detection", title: "Change Detection", isList: true, items: ["File-level: mtime, content hash, size thresholds","Doc-level: semantic diff; reindex changed sections only"] },
      { type: "section", id: "reindex", title: "Scheduled Reindex", isList: true, items: ["Triggers: time/event/quality/manual","Blue/green build + smoke tests + gradual traffic shift","Auto-rollback on regressions"] },
      { type: "section", id: "autotune", title: "Auto-Tuning", isList: true, items: ["Optimize k, chunk size/overlap, rerank threshold","Bayesian optimization over validation queries","Composite score: relevance, mrr, latency, cost"] },
      { type: "section", id: "monitoring", title: "Monitoring & Alerts", isList: true, items: ["Ingestion rate, index size, P50/P95/P99 latency","Hit rate, error rate, cost spikes","Alert when hit rate<0.65 or P95>3s"] },
      { type: "section", id: "dynamic-chunking", title: "Dynamic Chunking", isList: true, items: ["By headings if present","Short paragraphs → larger chunks","Very long paragraphs → smaller chunks","Default 512–1024 tokens"] },
      { type: "section", id: "benchmarks", title: "Benchmarks (Illustrative)", isList: true, items: ["Ingestion rate ↑ over weeks","P95 latency ↓","Hit@10 ↑"] },
      { type: "section", id: "env", title: "Environment Variables", content: "S3_BUCKET=my-docs-bucket | PINECONE_INDEX=auto-rag-index | EMBEDDING_MODEL=text-embedding-3-small | AUTO_TUNE_ENABLED=true | TUNE_SCHEDULE=\"0 2 * * 0\" | DEDUP_THRESHOLD=0.95 | MAX_EMBEDDING_RATE=10000/hour" },
      { type: "section", id: "failures", title: "Failure Modes (Mitigations)", isList: true, items: ["Runaway reindex → debounce 5 min min.","Embedding quota exhaustion → rate limit + cost alerts","Index corruption → WAL + snapshots","Over-dedup → manual review of sample pairs"] },
      { type: "section", id: "tuning-results", title: "Auto‑tuning Results (Example)", content: "Baseline: k=10, chunk=512, overlap=10%, thr=0.60 → Hit: 68.2%, Lat: 2.1s. Optimized (50 trials): k=15, chunk=768, overlap=15%, thr=0.68 → Hit: 74.8% (+6.6%), Lat: 1.9s (‑9.5%)." },
      { type: "section", id: "cost", title: "Monthly Cost Model (Example)", isList: true, items: ["Ingestion: change detect $10; parsing $50; embeddings $200","Indexing: storage $70; weekly reindex $20","Monitoring: metrics $50; alerting $10","Auto‑tuning compute: ~$120","Total: ~$520/month; saves ~20 eng hours/mo"] },
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
            <Link href="/blog/multi-pass-rag" className="text-indigo-400 hover:text-indigo-300">Multi‑Pass RAG</Link>
            <Link href="/blog/multi-source-rag" className="text-indigo-400 hover:text-indigo-300">Multi‑Source RAG</Link>
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
