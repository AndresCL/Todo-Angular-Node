/*
 Navicat Premium Data Transfer

 Source Server         : Postgres Local
 Source Server Type    : PostgreSQL
 Source Server Version : 90603
 Source Host           : localhost
 Source Database       : andres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 90603
 File Encoding         : utf-8

 Date: 05/25/2017 13:48:45 PM
*/

-- ----------------------------
--  Sequence structure for todos_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."todos_id_seq";
CREATE SEQUENCE "public"."todos_id_seq" INCREMENT 1 START 33 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "public"."todos_id_seq" OWNER TO "andres";

-- ----------------------------
--  Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" INCREMENT 1 START 1 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "public"."users_id_seq" OWNER TO "andres";

-- ----------------------------
--  Table structure for todos
-- ----------------------------
DROP TABLE IF EXISTS "public"."todos";
CREATE TABLE "public"."todos" (
	"id" int4 NOT NULL DEFAULT nextval('todos_id_seq'::regclass),
	"text" name,
	"done" bool,
	"createdAt" timestamp(6) NULL,
	"updatedAt" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."todos" OWNER TO "andres";

-- ----------------------------
--  Records of todos
-- ----------------------------
BEGIN;
INSERT INTO "public"."todos" VALUES ('33', 'Tarea 2', 'f', '2017-05-25 03:57:02.539', '2017-05-25 16:30:14.984');
INSERT INTO "public"."todos" VALUES ('24', 'Tarea 3', 'f', '2017-05-25 03:48:47.206', '2017-05-25 16:30:18.564');
INSERT INTO "public"."todos" VALUES ('3', 'Tarea 4', 'f', '2017-05-25 03:18:50.285', '2017-05-25 16:30:21.718');
INSERT INTO "public"."todos" VALUES ('20', 'Tarea 1', 'f', '2017-05-25 03:48:36.117', '2017-05-25 16:30:22.631');
INSERT INTO "public"."todos" VALUES ('25', 'Tarea 5', 't', '2017-05-25 03:49:43.299', '2017-05-25 16:30:25.171');
COMMIT;

-- ----------------------------
--  Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
	"id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
	"user" varchar(30) COLLATE "default",
	"pass" varchar(32) COLLATE "default",
	"createdAt" timestamp(6) NULL,
	"updatedAt" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."users" OWNER TO "andres";

-- ----------------------------
--  Records of users
-- ----------------------------
BEGIN;
INSERT INTO "public"."users" VALUES ('1', 'todo@kambda', '1a1dc91c907325c69271ddf0c944bc72', null, null);
COMMIT;


-- ----------------------------
--  Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."todos_id_seq" RESTART 34 OWNED BY "todos"."id";
ALTER SEQUENCE "public"."users_id_seq" RESTART 2 OWNED BY "users"."id";
-- ----------------------------
--  Primary key structure for table todos
-- ----------------------------
ALTER TABLE "public"."todos" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

