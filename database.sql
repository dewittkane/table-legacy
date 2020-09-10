
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "game" (
	"id" SERIAL PRIMARY KEY,
	"bgaId" varchar(50) NOT NULL,
	"name" varchar(255) NOT NULL,
	"image_url" TEXT NOT NULL,
	"url" TEXT NOT NULL
);

CREATE TABLE "game_instance" (
	"id" SERIAL PRIMARY KEY,
	"creator_id" INT REFERENCES "user",
	"game_id" INT REFERENCES "game",
	"date_played" DATE NOT NULL,
	"creator_notes" VARCHAR(255)
);

CREATE TABLE "players" (
	"id" SERIAL PRIMARY KEY,
	"users_id" INT REFERENCES "user",
	"players_name" VARCHAR(50),
	"game_instance_id" INT REFERENCES "game_instance" ON DELETE CASCADE,
	"score" INT,
	"is_winner" BOOLEAN NOT NULL DEFAULT 'false'
);