-- Run this in the Supabase SQL editor after 0001_add_title.sql has already been applied.

create extension if not exists vector;

alter table public.notes
  add column if not exists embedding vector(768);

-- Finds the current user's notes most similar to a given embedding, excluding
-- one note id (typically the note that was just created and is doing the search).
-- SECURITY INVOKER (the default) means this still runs as the calling user, so
-- row-level security on public.notes applies inside the function body too.
create or replace function public.match_notes(
  query_embedding vector(768),
  match_threshold float default 0.75,
  match_count int default 3,
  exclude_note_id uuid default null
)
returns table (
  id uuid,
  title text,
  text text,
  similarity float
)
language sql
stable
as $$
  select
    notes.id,
    notes.title,
    notes.text,
    1 - (notes.embedding <=> query_embedding) as similarity
  from public.notes
  where notes.user_id = auth.uid()
    and notes.embedding is not null
    and (exclude_note_id is null or notes.id <> exclude_note_id)
    and 1 - (notes.embedding <=> query_embedding) >= match_threshold
  order by notes.embedding <=> query_embedding
  limit match_count;
$$;
