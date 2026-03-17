import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLostPetsRadar1773709891130 implements MigrationInterface {
    name = 'CreateLostPetsRadar1773709891130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."lost_pets_species_enum" AS ENUM('perro', 'gato', 'ave', 'conejo', 'otro')`);
        await queryRunner.query(`CREATE TYPE "public"."lost_pets_size_enum" AS ENUM('pequeño', 'mediano', 'grande')`);
        await queryRunner.query(`CREATE TABLE "lost_pets" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "species" "public"."lost_pets_species_enum" NOT NULL, "breed" character varying NOT NULL, "color" character varying NOT NULL, "size" "public"."lost_pets_size_enum" NOT NULL, "description" text NOT NULL, "photo_url" character varying, "owner_name" character varying NOT NULL, "owner_email" character varying NOT NULL, "owner_phone" character varying NOT NULL, "location" geometry(Point,4326) NOT NULL, "address" character varying NOT NULL, "lost_date" TIMESTAMP NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4ba852a354b48000bcb3faaaea5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lost_pets"`);
        await queryRunner.query(`DROP TYPE "public"."lost_pets_size_enum"`);
        await queryRunner.query(`DROP TYPE "public"."lost_pets_species_enum"`);
    }

}
