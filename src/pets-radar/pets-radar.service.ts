import { Injectable } from '@nestjs/common';
import { LostPetsRadarCDto } from 'src/core/interfaces/lost-pets-radar.interface';
import { EmailOptions } from 'src/core/interfaces/mail-options.interface';
import { EmailService } from 'src/email/email.service';
import { generatePetRadarEmailTemplate } from './templates/pets-radar-email.template';
import { DataSource, Repository } from 'typeorm';
import { LostPetsRadar } from 'src/core/db/entities/lost-pets-radar.entity';
import { FoundPetsRadarCDto } from 'src/core/interfaces/found-pets-radar.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { FoundPetsRadar } from 'src/core/db/entities/found-pets-radar.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class PetsRadarService {

    constructor(
        @InjectRepository(LostPetsRadar)
        private readonly lostPetsRepository: Repository<LostPetsRadar>,

        @InjectRepository(FoundPetsRadar)
        private readonly foundPetsRepository: Repository<FoundPetsRadar>,

        @InjectDataSource()
        private readonly dataSource: DataSource,

        private readonly emailService: EmailService
    ) {}

    async getLostPets(): Promise<LostPetsRadar[]> {
        return this.lostPetsRepository.find({
            where: { is_active: true }
        });
    }

    async getFoundPets(): Promise<FoundPetsRadar[]> {
        return this.foundPetsRepository.find();
    }

    async createLostPets(lostPets: LostPetsRadarCDto) {
        const newLostPetsRadar = this.lostPetsRepository.create({
            name: lostPets.name,
            species: lostPets.species,
            breed: lostPets.breed,
            color: lostPets.color,
            size: lostPets.size,
            description: lostPets.description,
            photo_url: lostPets.photo_url,
            owner_name: lostPets.owner_name,
            owner_email: lostPets.owner_email,
            owner_phone: lostPets.owner_phone,
            address: lostPets.address,
            lost_date: lostPets.lost_date,
            location: {
                type: 'Point',
                coordinates: [lostPets.lon, lostPets.lat]
            }
        });
        await this.lostPetsRepository.save(newLostPetsRadar);
    }

    async sendFoundAndLostPetsEmail(lostPets: LostPetsRadarCDto, foundPets: FoundPetsRadarCDto): Promise<Boolean> {
        const template = generatePetRadarEmailTemplate(lostPets, foundPets);
        const options: EmailOptions = {
            to: "castromendezedgarleonel@gmail.com",
            subject: lostPets.name,
            html: template
        };
        return await this.emailService.sendEmail(options);
    }

    async createFoundPets(foundPets: FoundPetsRadarCDto): Promise<any> {
        const newFoundPetsRadar = this.foundPetsRepository.create({
            species: foundPets.species,
            breed: foundPets.breed,
            color: foundPets.color,
            size: foundPets.size,
            description: foundPets.description,
            photo_url: foundPets.photo_url,
            finder_name: foundPets.finder_name,
            finder_email: foundPets.finder_email,
            finder_phone: foundPets.finder_phone,
            address: foundPets.address,
            found_date: foundPets.found_date,
            location: {
                type: 'Point',
                coordinates: [foundPets.lon, foundPets.lat]
            }
        });
        await this.foundPetsRepository.save(newFoundPetsRadar);

        const nearbyLostPets: any[] = await this.dataSource.query(`
            SELECT *,
                ST_Y(location::geometry) as lat,
                ST_X(location::geometry) as lon
            FROM lost_pets
            WHERE is_active = true
            AND ST_DWithin(
                location::geography,
                ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
                500
            )
        `, [foundPets.lon, foundPets.lat]);

        if (nearbyLostPets.length > 0) {
            const matchingLostPet = nearbyLostPets[0];
            const lostPetDto: LostPetsRadarCDto = {
                ...matchingLostPet,
                lat: parseFloat(matchingLostPet.lat),
                lon: parseFloat(matchingLostPet.lon),
            };
            await this.sendFoundAndLostPetsEmail(lostPetDto, foundPets);
            return {
                message: 'Found pet registered. Nearby lost pets found!',
                nearbyLostPets
            };
        }

        return {
            message: 'Found pet registered. No nearby lost pets within 500m.',
            nearbyLostPets: []
        };
    }
}