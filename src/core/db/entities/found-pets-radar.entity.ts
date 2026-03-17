import { PetsSize } from "src/core/enums/pets-size.enum";
import { PetSpecies } from "src/core/enums/pets-species.enum";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { Point } from "typeorm";

@Entity("found_pets")
export class FoundPetsRadar {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'enum', enum: PetSpecies })
    species: PetSpecies;

    @Column({ type: 'varchar', nullable: true })
    breed: string | null;

    @Column({ type: 'varchar' })
    color: string;

    @Column({ type: 'enum', enum: PetsSize })
    size: PetsSize;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', nullable: true })
    photo_url: string | null;

    @Column({ type: 'varchar' })
    finder_name: string;

    @Column({ type: 'varchar' })
    finder_email: string;

    @Column({ type: 'varchar' })
    finder_phone: string;

    @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
    location: Point;

    @Column({ type: 'varchar' })
    address: string;

    @Column({ type: 'timestamp' })
    found_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}