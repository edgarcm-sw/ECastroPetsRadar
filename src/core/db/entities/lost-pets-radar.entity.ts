import { PetsSize } from "src/core/enums/pets-size.enum";
import { PetSpecies } from "src/core/enums/pets-species.enum";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { Point } from "typeorm";

@Entity("lost_pets")
export class LostPetsRadar {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'enum', enum: PetSpecies })
    species: PetSpecies;

    @Column({ type: 'varchar' })
    breed: string;

    @Column({ type: 'varchar' })
    color: string;

    @Column({ type: 'enum', enum: PetsSize })
    size: PetsSize;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', nullable: true })
    photo_url: string | null;

    @Column({ type: 'varchar' })
    owner_name: string;

    @Column({ type: 'varchar' })
    owner_email: string;

    @Column({ type: 'varchar' })
    owner_phone: string;

    @Column({ 
        type: 'geometry', 
        spatialFeatureType: 'Point', 
        srid: 4326 
    })
    location: Point;

    @Column({ type: 'varchar' })
    address: string;

    @Column({ type: 'timestamp' })
    lost_date: Date;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}