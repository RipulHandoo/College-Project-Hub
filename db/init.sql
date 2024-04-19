CREATE TABLE IF NOT EXISTS users
(
    name character varying(55) COLLATE pg_catalog."default" NOT NULL,
    prn bigserial NOT NULL, -- Use bigserial for an auto-incrementing primary key
    password character varying(250) COLLATE pg_catalog."default" NOT NULL,
    createdat timestamp without time zone DEFAULT current_timestamp, -- Added default value
    CONSTRAINT users_pkey PRIMARY KEY (prn)
);
