-- Migracja: profiles + check_ins (Enpsyneia Check In, Etap 2 — model hybrydowy)
-- Plan: docs/plans/PLAN_supabase_auth_and_checkins.md
-- ADR:  docs/architecture/adr_003_supabase_accounts.md
--
-- Uruchomienie (ręczne, po stronie właściciela):
--   Supabase → SQL Editor → wklej całość → Run
--   lub: supabase db push
--
-- Decyzje właściciela odwzorowane w tej migracji:
--   D2 — klucz główny check-inów: bigint generated always as identity
--   D3 — zapisujemy wynik: day_type + microaction_title
--   RLS — dla check-inów tylko SELECT i INSERT własnych rekordów; brak UPDATE/DELETE
--   profiles — tylko id, nickname, created_at; nickname nieedytowalny przez klienta
--   bez e-maila i hasła w profiles (są w auth.users)

-- 1. profiles --------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  nickname   text not null,
  created_at timestamptz not null default now()
);

-- 2. check_ins -------------------------------------------------------------
create table if not exists public.check_ins (
  id                bigint generated always as identity primary key,
  user_id           uuid not null references auth.users (id) on delete cascade,
  energy            smallint not null check (energy    between 1 and 5),
  overload          smallint not null check (overload  between 1 and 5),
  paralysis         smallint not null check (paralysis between 1 and 5),
  movement          smallint not null check (movement  between 1 and 5),
  social            smallint not null check (social    between 1 and 5),
  agency            smallint not null check (agency    between 1 and 5),
  day_type          text not null,
  microaction_title text not null,
  created_at        timestamptz not null default now()
);

create index if not exists check_ins_user_created_idx
  on public.check_ins (user_id, created_at desc);

-- 3. Granty (minimalne) ----------------------------------------------------
-- Nie polegamy na domyślnych przywilejach Supabase (mogą nie nadać DML rolom
-- anon/authenticated w zależności od roli wykonującej migrację). Nadajemy
-- jawnie i wyłącznie to, czego wymaga aplikacja:
--   authenticated: SELECT na profiles; SELECT + INSERT na check_ins.
--   anon: brak jakichkolwiek przywilejów na danych (brak dostępu).
-- Najpierw odbieramy wszystko (kasuje też zbędne REFERENCES/TRIGGER/TRUNCATE),
-- potem nadajemy minimalny zestaw. Brak UPDATE/DELETE => zgodnie z ADR 003.
-- Profil tworzy trigger handle_new_user (security definer), niezależnie od tych grantów.
revoke all on public.profiles  from anon, authenticated;
revoke all on public.check_ins from anon, authenticated;

grant select          on public.profiles  to authenticated;
grant select, insert  on public.check_ins to authenticated;

-- 4. RLS -------------------------------------------------------------------
alter table public.profiles  enable row level security;
alter table public.check_ins enable row level security;

-- profiles: tylko odczyt własnego profilu.
-- Brak polityk INSERT/UPDATE/DELETE => klient nie może zakładać, edytować ani usuwać profilu.
-- (INSERT realizuje wyłącznie trigger handle_new_user jako security definer.)
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- check_ins: wyłącznie własne rekordy, wyłącznie SELECT i INSERT.
-- Brak polityk UPDATE/DELETE => edycja i usuwanie niemożliwe przez API.
-- Brak polityk dla roli anon => niezalogowany nie ma dostępu do danych.
create policy "check_ins_select_own"
  on public.check_ins for select
  to authenticated
  using (auth.uid() = user_id);

create policy "check_ins_insert_own"
  on public.check_ins for insert
  to authenticated
  with check (auth.uid() = user_id);

-- 5. Trigger tworzący profil po rejestracji --------------------------------
-- security definer: zapis profilu omija RLS (klient nie ma INSERT na profiles).
-- search_path = '' + pełne kwalifikacje nazw => brak ryzyka przejęcia search_path.
-- nickname pochodzi z metadanych przekazanych przy signUp({ options: { data: { nickname } } }).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, nickname)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'nickname'), ''), 'użytkownik')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Funkcja działa wyłącznie jako trigger (wykonuje się z prawami właściciela niezależnie
-- od EXECUTE). Odbieramy EXECUTE, aby nie była wywoływalna przez REST RPC dla anon/authenticated
-- (usuwa ostrzeżenia security lint 0028/0029 „Public/Signed-In can execute SECURITY DEFINER function").
revoke execute on function public.handle_new_user() from public, anon, authenticated;
