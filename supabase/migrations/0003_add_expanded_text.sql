-- Run this in the Supabase SQL editor after 0002_add_embedding_and_match_notes.sql has already been applied.

alter table public.notes
  add column if not exists expanded_text text;
