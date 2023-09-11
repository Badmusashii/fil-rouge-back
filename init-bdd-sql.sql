CREATE DATABASE restodespotos;

CREATE TABLE member (
  id SERIAL PRIMARY KEY,
  lastname VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(60) NOT NULL
);

CREATE TYPE price AS ENUM ('€', '€€', '€€€');

CREATE TABLE categorie (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE restaurant (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  adresse VARCHAR(255) NOT NULL,
  price price NOT NULL,
  idMember INTEGER NOT NULL,
  idCategorie INTEGER NOT NULL,
  CONSTRAINT fk_member FOREIGN KEY (idMember) REFERENCES member(id),
  CONSTRAINT fk_categorie FOREIGN KEY (idCategorie) REFERENCES categorie(id)
);

CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  review TEXT NOT NULL,
  vote BOOLEAN NOT NULL,
  idMember INTEGER,
  idRestaurant INTEGER,
  FOREIGN KEY (idMember) REFERENCES member(id),
  FOREIGN KEY (idRestaurant) REFERENCES restaurant(id)
);

CREATE TABLE groupe (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  idReview INT NOT NULL,
  FOREIGN KEY (idReview) REFERENCES review(id)
);

CREATE TABLE membergroupe (
  id SERIAL PRIMARY KEY,
  idMember INTEGER,
  idGroupe INTEGER,
  FOREIGN KEY (idMember) REFERENCES member(id),
  FOREIGN KEY (idGroupe) REFERENCES groupe(id)
);

