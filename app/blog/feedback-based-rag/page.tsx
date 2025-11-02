"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

export default function FeedbackBasedRAGPage() {
  const blogPost = {
    slug: "feedback-based-rag",
    title: "Feedback-Based RAG: Self-Improving Retrieval with User Signals",
    excerpt:
      "Use explicit and implicit user feedback to rerank, retrain, and continuously improve RAG quality. Expect steady NDCG gains month over month.",
    author: "William Marrero Masferrer",
    date: "2025-11-01",
    readTime: "13 min",
    category: "IA",
    tags: ["RAG", "Feedback", "Rerank", "Optimization"],
    content: [
      {
        type: "section",
        id: "tldr",
        title: "TL;DR",
        content:
          "Collect explicit (ratings) and implicit (clicks, dwell) signals, convert them to rewards, rerank in real time, and batch‑retrain weekly for durable gains.",
      },
      {
        type: "section",
        id: "definition",
        title: "What is Feedback-Based RAG?",
        content:
          "A RAG system that learns from usage. User feedback updates retrieval scores/rerankers online and via periodic retraining.",
      },
      {
        type: "section",
        id: "signals",
        title: "Feedback Signals",
        isList: true,
        items: [
          "Explicit: thumbs, stars, helpful",
          "Implicit: clicks, dwell >30s, copy/share",
          "Negative: immediate back/ refine query",
          "Combined score: 0.6×explicit + 0.4×implicit",
        ],
      },
      {
        type: "section",
        id: "updates",
        title: "Update Mechanisms",
        isList: true,
        items: [
          "Online: EMA update of retrieval scores (fast, noisy)",
          "Offline: daily aggregation + weekly reranker retrain",
          "Cadence: A/B test and roll back if metrics regress",
        ],
      },
      {
        type: "section",
        id: "data-requirements",
        title: "Data Requirements",
        isList: true,
        items: [
          "Log: user_id, query, doc_ids, scores, rating, timestamp",
          "Thresholds: ≥100 feedback samples before retraining",
          "Temporal decay: weight recent feedback higher (exp. decay)",
        ],
      },
      {
        type: "section",
        id: "retrieval-config",
        title: "Retrieval Configuration",
        isList: true,
        items: [
          "Base: BM25 + Dense (e.g., Contriever)",
          "Feedback layer: fine‑tuned reranker on feedback data",
          "Cold start: content similarity until ≥50 ratings",
          "Ensemble: 0.5×base + 0.3×feedback + 0.2×recency",
        ],
      },
      {
        type: "section",
        id: "env",
        title: "Environment Variables",
        content:
          "FEEDBACK_DB_URL=postgresql://… | MIN_FEEDBACK_COUNT=50 | DECAY_RATE=0.95 | UPDATE_SCHEDULE=\"0 2 * * *\"",
      },
      {
        type: "section",
        id: "guardrails",
        title: "Guardrails",
        isList: true,
        items: [
          "Outlier detection and velocity limits",
          "Honeypots to catch bots; rate limiting",
          "Temporal decay so recent feedback counts more",
        ],
      },
      {
        type: "section",
        id: "cost",
        title: "Cost Model (100K monthly queries)",
        isList: true,
        items: [
          "Storage: ~100MB/month ≈ $0.01",
          "Daily batch: ≈ $3/month",
          "Weekly reranker retrain: ≈ $20/month",
          "Total: ≈ $23/month",
        ],
      },
      {
        type: "section",
        id: "benchmarks",
        title: "Benchmarks (Illustrative)",
        isList: true,
        items: [
          "NDCG@10: +8–16% over 4–8 weeks",
          "Coverage: % results with ratings ↑",
          "Conversion metrics (positive action) ↑",
        ],
      },
      {
        type: "section",
        id: "ndcg-series",
        title: "NDCG Weekly Deltas (Example)",
        isList: true,
        items: [
          "Week 0: 0.41",
          "Week 1: 0.45 (+0.04)",
          "Week 2: 0.48 (+0.03)",
          "Week 4: 0.51 (+0.03)",
        ],
      },
      {
        type: "section",
        id: "security",
        title: "Security & Privacy",
        isList: true,
        items: [
          "Strip PII; store aggregates where possible",
          "GDPR: support delete requests",
          "Audit logs: retain original ratings separate from aggregates",
        ],
      },
      {
        type: "section",
        id: "ablation",
        title: "Ablation (Illustrative)",
        isList: true,
        items: [
          "Explicit only: +8.2% (low noise)",
          "Implicit only: +5.1% (med noise)",
          "Combined: +12.4% (med noise)",
          "+ Temporal decay: +14.7% (low noise)",
        ],
      },
      {
        type: "section",
        id: "n8n",
        title: "Minimal n8n Workflow",
        content:
          "Webhook → DB insert (feedback) → Daily aggregate → Weekly retrain reranker → Update vector metadata → A/B test.",
      },
      {
        type: "section",
        id: "use-cases",
        title: "Real‑World Fits",
        isList: true,
        items: [
          "E‑commerce search: rank by purchases/engagement",
          "Docs/support: surface articles that resolve issues",
          "Academic: rank by saves/citations",
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
            <Link href="/blog/interactive-rag" className="text-indigo-400 hover:text-indigo-300">Interactive RAG</Link>
            <Link href="/blog/standard-rag" className="text-indigo-400 hover:text-indigo-300">Standard RAG</Link>
            <Link href="/blog/corrective-rag" className="text-indigo-400 hover:text-indigo-300">Corrective RAG</Link>
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
