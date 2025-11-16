export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: any;
  published: boolean;
  published_at: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  author?: string;
  read_time?: string;
  category?: string;
}
