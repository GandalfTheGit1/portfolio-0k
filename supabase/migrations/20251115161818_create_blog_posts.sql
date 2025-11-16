-- Enable pgcrypto for gen_random_uuid
create extension if not exists "pgcrypto" with schema public;

-- Main blog posts table
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  tags text[] not null default '{}',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Timestamp maintenance trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

-- Helpful indexes
create index if not exists blog_posts_slug_lower_idx on public.blog_posts (lower(slug));
create index if not exists blog_posts_published_idx on public.blog_posts (published, published_at);

-- Enable RLS and policies
alter table public.blog_posts enable row level security;

create policy if not exists "Public can read published posts"
  on public.blog_posts for select
  using (published = true);

create policy if not exists "Service role full access"
  on public.blog_posts for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
