set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Workouts" (
	"WorkoutID" serial NOT NULL,
	"Date" DATE NOT NULL,
	"UserID" integer NOT NULL,
	CONSTRAINT "Workouts_pk" PRIMARY KEY ("WorkoutID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Exercises" (
	"WorkoutID" serial NOT NULL UNIQUE,
	"WorkoutName" TEXT NOT NULL,
	"MuscleGroup" TEXT NOT NULL,
	"Sets" integer NOT NULL,
	"Reps" integer NOT NULL,
	"Notes" TEXT NOT NULL,
  "UserID" integer NOT NULL,
	CONSTRAINT "Exercises_pk" PRIMARY KEY ("WorkoutID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Exercise Ideas" (
	"IdeaID" serial NOT NULL UNIQUE,
	"ExerciseName" TEXT NOT NULL UNIQUE,
	"MuscleGroup" TEXT NOT NULL,
  "Equipment" TEXT NOT NULL,
	"Info" TEXT NOT NULL,
	"UserID" integer NOT NULL,
	CONSTRAINT "Exercise Ideas_pk" PRIMARY KEY ("IdeaID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."User" (
	"UserID" serial NOT NULL,
	"HashedPassword" TEXT NOT NULL UNIQUE,
	"Username" TEXT NOT NULL UNIQUE,
	CONSTRAINT "User_pk" PRIMARY KEY ("UserID")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_fk0" FOREIGN KEY ("WorkoutID") REFERENCES "Month Workouts"("WorkoutID");
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_fk1" FOREIGN KEY ("UserID") REFERENCES "User"("UserID");

ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_fk0" FOREIGN KEY ("WorkoutID") REFERENCES "Workouts"("WorkoutID");

ALTER TABLE "Exercise Ideas" ADD CONSTRAINT "Exercise Ideas_fk0" FOREIGN KEY ("UserID") REFERENCES "User"("UserID");
