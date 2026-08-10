-- Run this in the Supabase SQL editor after schema.sql has already been applied.

alter table public.notes
  add column if not exists title text not null default '';
