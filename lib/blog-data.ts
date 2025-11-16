import blogPosts from '@/data/blog-posts.json';
import { BlogPost } from '@/types/blog';

type RawBlogPost = Omit<BlogPost, 'slug'> & {
  id: string;
  slug?: string;
};

const rawPosts = blogPosts.posts as RawBlogPost[];

function normalizePost(post: RawBlogPost): BlogPost {
  return {
    ...post,
    slug: post.slug ?? post.id,
  };
}

export function getAllPosts(): BlogPost[] {
  return rawPosts
    .filter((post) => post.published)
    .map(normalizePost);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const post = rawPosts.find(
    (post) => (post.slug ?? post.id) === slug && post.published,
  );
  return post ? normalizePost(post) : null;
}

export function getLatestPosts(limit = 3): BlogPost[] {
  return getAllPosts()
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, limit);
}

export function getAllPostSlugs(): { slug: string }[] {
  return rawPosts
    .filter((post) => post.published)
    .map((post) => ({ slug: post.slug ?? post.id }));
}
