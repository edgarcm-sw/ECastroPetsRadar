import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFoundPetsRadar1773717511589 implements MigrationInterface {
    name = 'CreateFoundPetsRadar1773717511589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."found_pets_species_enum" AS ENUM('perro', 'gato', 'ave', 'conejo', 'otro')`);
        await queryRunner.query(`CREATE TYPE "public"."found_pets_size_enum" AS ENUM('pequeño', 'mediano', 'grande')`);
        await queryRunner.query(`CREATE TABLE "found_pets" ("id" SERIAL NOT NULL, "species" "public"."found_pets_species_enum" NOT NULL, "breed" character varying, "color" character varying NOT NULL, "size" "public"."found_pets_size_enum" NOT NULL, "description" text NOT NULL, "photo_url" character varying, "finder_name" character varying NOT NULL, "finder_email" character varying NOT NULL, "finder_phone" character varying NOT NULL, "location" geometry(Point,4326) NOT NULL, "address" character varying NOT NULL, "found_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1e8aeb0b37dd97bfce972552b8d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "found_pets"`);
        await queryRunner.query(`DROP TYPE "public"."found_pets_size_enum"`);
        await queryRunner.query(`DROP TYPE "public"."found_pets_species_enum"`);
    }

}
