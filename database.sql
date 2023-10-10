CREATE DATABASE test_et_vous;

drop table if exists test;
drop table if exists question;
drop table if exists reponse;
drop table if exists "analyse";
drop table if exists "role";
drop table if exists utilisateur;
drop table if exists reponse_uti;

CREATE TABLE test (
  idTest SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  resultat TEXT NOT NULL
);
CREATE TABLE question (
  idQuestion SERIAL PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  idTest INT not null,
  CONSTRAINT fk_test FOREIGN KEY (idTest) REFERENCES test(idTest)
);
CREATE TABLE "analyse" (
  idAnalyse SERIAL PRIMARY KEY,
  "analyse" TEXT NOT NULL
);
CREATE TABLE reponse (
  idReponse SERIAL PRIMARY KEY,
  reponse VARCHAR(255) NOT NULL,
  idAnalyse INT not null,
  idQuestion INT not null,
  CONSTRAINT fk_analyse FOREIGN KEY (idAnalyse) REFERENCES "analyse"(idAnalyse),
  CONSTRAINT fk_question FOREIGN KEY (idQuestion) REFERENCES question(idQuestion)
);
CREATE TABLE "role" (
  idRole SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL
);
CREATE TABLE utilisateur (
  idUtilisateur SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  pseudo VARCHAR(255) NOT NULL,
  mdp VARCHAR(60) not null,
  idRole INT not null,
  CONSTRAINT fk_role FOREIGN KEY (idRole) REFERENCES "role"(idRole)
);
CREATE TABLE reponse_uti (
  score INT not null,
  idUtilisateur INT not null,
  idReponse INT not null,
  CONSTRAINT fk_utilisateur FOREIGN KEY (idUtilisateur) REFERENCES utilisateur(idUtilisateur),
  CONSTRAINT fk_reponse FOREIGN KEY (idReponse) REFERENCES reponse(idReponse)
);
