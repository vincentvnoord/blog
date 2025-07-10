-- migrate:up

CREATE TABLE blogposts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    slug VARCHAR(60) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMPTZ NULL
);

-- migrate:down

DROP TABLE IF EXISTS blogposts;
