"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

export default function AdversarialRAGPage() {
  const blogPost = {
    slug: "adversarial-rag",
    title: "Adversarial RAG: Harden Your System Against Injection & Poisoning",
    excerpt:
      "Defend RAG against prompt injection, document poisoning, and exfiltration with layered defenses: sanitize → verify → filter → rerank → verify output.",
    author: "William Marrero Masferrer",
    date: "2025-11-01",
    readTime: "14 min",
    category: "IA",
    tags: ["RAG", "Security", "Prompt Injection", "Poisoning"],
    content: [
      {
        type: "section",
        id: "tldr",
        title: "TL;DR",
        content:
          "Apply multi‑layer defenses across input, retrieval, rerank, and generation. Target ASR <5% with modest latency overhead (~150–250ms).",
      },
      {
        type: "section",
        id: "threats",
        title: "Threat Model",
        isList: true,
        items: [
          "Prompt injection (direct/indirect)",
          "Document poisoning (backdoors, hidden instructions)",
          "Query manipulation (exfiltration, jailbreaks)",
          "Retrieval manipulation (adversarial suffixes)",
        ],
      },
      {
        type: "section",
        id: "defense",
        title: "Layered Defense",
        isList: true,
        items: [
          "Input: allowlist chars, length caps, rate limits",
          "Retrieval: verified corpus, similarity thresholds, diversity",
          "Rerank: adversarial detector + content safety",
          "Generation: prompt isolation, output filtering, citation enforcement",
        ],
      },
      {
        type: "section",
        id: "tests",
        title: "Adversarial Test Suite",
        isList: true,
        items: [
          "Prompt injection set (direct/nested/multi‑turn)",
          "Poisoning set (hidden instructions, semantic backdoors)",
          "Exfiltration attempts (PII/system prompt)",
          "Evasion (encoding tricks, multi‑language)",
        ],
      },
      {
        type: "section",
        id: "architecture",
        title: "Defensive Architecture",
        content:
          "Sanitize → Allowlist → Verified retrieval → Content filter → Adversarial rerank → Generation constraints → Output verify → Monitor.",
      },
      {
        type: "section",
        id: "snippets",
        title: "Snippets (Pseudo)",
        isList: true,
        items: [
          "sanitize(query): block phrases, cap length (≤500), rate‑limit",
          "filter(doc): regex for SYSTEM OVERRIDE, scripts, credentials → drop",
        ],
      },
      {
        type: "section",
        id: "adv-training",
        title: "Adversarial Training",
        isList: true,
        items: [
          "Dataset: paraphrases, char perturbations, semantic mutations",
          "Sources: OWASP LLM, BadRAG/TrojanRAG, internal red team",
          "Train bin classifier for detection + fine‑tune reranker",
        ],
      },
      {
        type: "section",
        id: "layer-config",
        title: "Layered Retrieval Config",
        isList: true,
        items: [
          "L1 Input: allowlist charset; length 10–500; 100 q/h/user",
          "L2 Retrieval: verified corpus; sim > 0.6; enforce diversity",
          "L3 Rerank: adversarial detector + content safety",
          "L4 Generation: prompt isolation, output filter, citations",
        ],
      },
      {
        type: "section",
        id: "benchmarks",
        title: "Benchmarks & Targets",
        isList: true,
        items: [
          "Targets: ASR <5%, FPR <2%, detect <100ms, auto‑recovery <1h",
          "Example: sanitization → verification → rerank → filter reduces ASR to ~1–3% with ~150–250ms overhead",
        ],
      },
      {
        type: "section",
        id: "checklist",
        title: "Security Checklist",
        isList: true,
        items: [
          "Input sanitization & rate limits",
          "Provenance + signatures; anomaly detection",
          "Monthly adversarial reranker updates",
          "Comprehensive logging; quarterly red team",
        ],
      },
      {
        type: "section",
        id: "cost",
        title: "Cost Model (Illustrative)",
        isList: true,
        items: [
          "+$0.0001/query detector (~100ms GPU)",
          "+$0.00005/doc verification (hash)",
          "Monitoring: ~$500/month; IR: ~$5000/year avg",
        ],
      },
      {
        type: "section",
        id: "env",
        title: "Environment Variables",
        content:
          "ADVERSARIAL_MODEL_PATH=/models/detector.pkl | BLOCK_THRESHOLD=0.85 | MAX_QUERY_LENGTH=500 | RATE_LIMIT_WINDOW=3600 | RATE_LIMIT_MAX=100 | ALERT_WEBHOOK=https://…",
      },
      {
        type: "section",
        id: "ops",
        title: "Ops & Incident Response",
        isList: true,
        items: [
          "Monitoring: anomaly alerts and block thresholds",
          "Containment: quarantine docs, disable features if needed",
          "Rollback: retain previous index/models 7–30 days",
          "Post‑mortem: document and retrain on new vectors",
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
            <Link href="/blog/standard-rag" className="text-indigo-400 hover:text-indigo-300">Standard RAG</Link>
            <Link href="/blog/corrective-rag" className="text-indigo-400 hover:text-indigo-300">Corrective RAG</Link>
            <Link href="/blog/agentic-rag" className="text-indigo-400 hover:text-indigo-300">Agentic RAG</Link>
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
