-- ================================================
-- EJECUTA ESTO EN SUPABASE → SQL EDITOR → RUN
-- ================================================

-- Tabla de comidas
create table if not exists meals (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  date text not null,
  type text not null,
  description text not null,
  kcal integer not null,
  created_at timestamp with time zone default now()
);

-- Tabla de historial diario
create table if not exists daily_history (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  date text not null,
  consumed integer default 0,
  burned integer default 0,
  net integer default 0,
  updated_at timestamp with time zone default now(),
  unique(user_id, date)
);

-- Tabla de peso
create table if not exists weight_log (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  date text not null,
  weight numeric(5,1) not null,
  recorded_at timestamp with time zone default now(),
  unique(user_id, date)
);

-- Tabla de progreso/gamificación
create table if not exists user_progress (
  user_id text primary key,
  xp integer default 0,
  streak integer default 0,
  last_streak_date text,
  cfg jsonb default '{"goal":2000,"weight":108,"target":87}'::jsonb,
  updated_at timestamp with time zone default now()
);

-- Desactivar RLS (app personal, un solo usuario)
alter table meals disable row level security;
alter table daily_history disable row level security;
alter table weight_log disable row level security;
alter table user_progress disable row level security;
