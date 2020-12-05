-- //queries into DB
--   //add answer
--   //add question
--   //add reported to answer/question
--   //add thumbnail to answer
--   //add helpfulness to answer/question

\connect qa;


DROP SCHEMA IF EXISTS qa;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS photos;

CREATE SCHEMA qa;
SET search_path TO qa, public;

CREATE TABLE questions (
   question_id SERIAL PRIMARY KEY,
   product_id INT,
   question_body VARCHAR(255),
   question_date DATE,
   asker_name VARCHAR(255),
   helpfulness INT,
   reported BOOLEAN
);

CREATE TABLE answers (
   answer_id SERIAL PRIMARY KEY,
   question_id INT GENERATED ALWAYS AS IDENTITY,
   answer_body VARCHAR(255),
   answer_date DATE,
   answerer_name VARCHAR(255),
   helpfulness INT,
   reported BOOLEAN
);

CREATE TABLE photos (
   photo_id SERIAL PRIMARY KEY,
   answer_id INT GENERATED ALWAYS AS IDENTITY,
   thumbnail VARCHAR(255)
);

