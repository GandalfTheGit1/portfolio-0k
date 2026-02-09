import { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog | Will Marrero',
  description: 'Artículos sobre desarrollo, IA y tecnología.',
};

function formatDate(dateString: string) {
  return format(new Date(dateString), 'd MMMM yyyy', { locale: es });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-950 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">Blog</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Artículos sobre desarrollo, IA y tecnología. Aprende sobre RAG, LLMs y más.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full">
                    {post.category || 'IA'}
                  </span>
                  <span className="text-slate-500 text-sm">
                    {formatDate(post.published_at)}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-indigo-400 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.read_time || '5 min'}
                  </span>
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                  >
                    Leer más →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
