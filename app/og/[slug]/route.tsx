import { ImageResponse } from "next/og"

export const runtime = "edge"
export const contentType = "image/png"

function toTitleCase(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export async function GET(req: Request, ctx: { params: { slug: string } }) {
  const slug = decodeURIComponent(ctx.params.slug || "")
  const title = toTitleCase(slug)
  const url = `william-marrero.vercel.app/blog/${slug}`

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1f2937 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 28, opacity: 0.9 }}>by William Marrero Masferrer</div>
          <div style={{ fontSize: 24, opacity: 0.8 }}>{url}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
