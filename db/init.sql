-- Create Table users
CREATE TABLE IF NOT EXISTS users
(
    name character varying(55) COLLATE pg_catalog."default" NOT NULL,
    prn bigserial NOT NULL, -- Use bigserial for an auto-incrementing primary key
    password character varying(250) COLLATE pg_catalog."default" NOT NULL,
    createdat timestamp without time zone DEFAULT current_timestamp, -- Added default value
    CONSTRAINT users_pkey PRIMARY KEY (prn)
);


-- Create Table projects
CREATE TABLE IF NOT EXISTS projects
(
    project_id SERIAL PRIMARY KEY,
    prn BIGINT NOT NULL,
    repo_name VARCHAR(255) NOT NULL,
    description TEXT,
    tech_stack TEXT[],
    is_private BOOLEAN NOT NULL,
    direct_link TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);