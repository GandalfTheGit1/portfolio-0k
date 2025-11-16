-- Insert blog posts with their content
INSERT INTO public.blog_posts (
  slug, title, excerpt, content, published, published_at, tags, created_at, updated_at, author, read_time
) VALUES 
(
  'standard-rag',
  'Standard RAG: The Foundation of Retrieval-Augmented Generation',
  'Understand Standard RAG — the foundation of modern retrieval-augmented generation. Learn how to build it in N8N, where it shines, and its limitations.',
  '{"sections": [{"type": "section", "id": "tldr", "title": "TL;DR", "content": "Standard RAG combines an LLM with a vector database to answer questions grounded in external data. It''s the backbone of AI systems that require factual accuracy."}, {"type": "section", "id": "definition", "title": "What Is Standard RAG?", "content": "Retrieval-Augmented Generation (RAG) is a technique that allows a language model to fetch information from a database before generating an answer. Instead of relying purely on what the model ''knows,'' it pulls relevant context from an external source."}]}',
  true,
  '2025-11-01T00:00:00Z',
  ARRAY['RAG', 'AI', 'N8N', 'LLM', 'Vector Database'],
  NOW(),
  NOW(),
  'Will',
  '12 min'
),
(
  'fusion-rag',
  'Fusion RAG: Combining Multiple Data Sources for Smarter Retrieval',
  'Fusion RAG merges multiple retrieval sources—vector, keyword, and API—to produce more comprehensive, bias-resistant answers.',
  '{"sections": [{"type": "section", "id": "tldr", "title": "TL;DR", "content": "Fusion RAG merges multiple retrieval sources for better answers."}]}',
  true,
  '2025-11-01T00:00:00Z',
  ARRAY['RAG', 'AI', 'Multi-Source', 'N8N'],
  NOW(),
  NOW(),
  'Will',
  '14 min'
),
(
  'corrective-rag',
  'Corrective RAG: Making LLMs Trustworthy Through Feedback Loops',
  'Learn how Corrective RAG adds self-checking feedback loops to Retrieval-Augmented Generation workflows, reducing hallucinations and improving factual reliability.',
  '{"sections": [{"type": "section", "id": "tldr", "title": "TL;DR", "content": "Corrective RAG adds verification steps to improve answer accuracy."}]}',
  true,
  '2025-11-01T00:00:00Z',
  ARRAY['RAG', 'Verification', 'Feedback', 'LLM'],
  NOW(),
  NOW(),
  'Will',
  '13 min'
);

-- Add more posts as needed...

-- Enable RLS for blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

CREATE POLICY "Enable all access for service role"
ON public.blog_posts
FOR ALL
USING (auth.role() = 'service_role');
