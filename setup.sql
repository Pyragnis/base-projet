-- Exemple de script de création de la base de données et d'une table users
CREATE DATABASE spotify;
\c spotify;

CREATE TABLE music (
    id SERIAL PRIMARY KEY,
    musicname VARCHAR(50) UNIQUE NOT NULL,
    link VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE album (
    id SERIAL PRIMARY KEY,
    albumname VARCHAR(50) UNIQUE NOT NULL,
    albumimage VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    