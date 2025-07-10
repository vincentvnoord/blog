SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blogposts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blogposts (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    slug character varying(60) NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    published_at timestamp with time zone
);


--
-- Name: blogposts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.blogposts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: blogposts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.blogposts_id_seq OWNED BY public.blogposts.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: blogposts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogposts ALTER COLUMN id SET DEFAULT nextval('public.blogposts_id_seq'::regclass);


--
-- Name: blogposts blogposts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogposts
    ADD CONSTRAINT blogposts_pkey PRIMARY KEY (id);


--
-- Name: blogposts blogposts_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogposts
    ADD CONSTRAINT blogposts_slug_key UNIQUE (slug);


--
-- Name: blogposts blogposts_title_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogposts
    ADD CONSTRAINT blogposts_title_key UNIQUE (title);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20250706104242');
