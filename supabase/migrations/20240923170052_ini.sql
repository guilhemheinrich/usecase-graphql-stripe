create schema if not exists extensions;

create extension if not exists "uuid-ossp" schema extensions;

alter database "postgres"
set
    search_path to extensions,
    public;

create table if not exists
    public.beewyse_ong (
        slug text primary key,
        email text not null,
        stripe_customer_id text null,
        stripe_account_id text null,
        constraint slug check (slug ~ '^[a-zA-Z0-9_-]+$')
    );

create table if not exists
    public.beewyse_band (slug text primary key, constraint slug check (slug ~ '^[a-zA-Z0-9_-]+$'));

create table if not exists
    public.beewyse_artist (
        _id uuid not null default uuid_generate_v4 (),
        email text not null,
        firstname text not null,
        lastname text not null,
        stripe_customer_id text null,
        stripe_account_id text null,
        constraint pk_artist primary key (_id)
    );

create table if not exists
    public.beewyse_artist_band (
        artist_id uuid not null,
        band_id text not null,
        primary key (artist_id, band_id),
        constraint fk_artist foreign key (artist_id) references public.beewyse_artist (_id) on delete cascade,
        constraint fk_band foreign key (band_id) references public.beewyse_band (slug) on delete cascade
    );