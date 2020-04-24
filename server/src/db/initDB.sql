DROP TABLE IF EXISTS users; 

CREATE TABLE IF NOT EXISTS users ( 
    id         INTEGER PRIMARY KEY, 
    username   TEXT NOT NULL UNIQUE, 
    email      TEXT NOT NULL UNIQUE, 
    pwd        TEXT NOT NULL, 
    timezone   TEXT NOT NULL, 
    created_at TEXT, 
    updated_at TEXT 
);