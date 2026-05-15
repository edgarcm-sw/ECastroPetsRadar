import { Body, Controller, Get, Post } from '@nestjs/common';
import { PetsRadarService } from './pets-radar.service';
import type { LostPetsRadarCDto } from 'src/core/interfaces/lost-pets-radar.interface';
import type { FoundPetsRadarCDto } from 'src/core/interfaces/found-pets-radar.interface';
import type { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller()
export class PetsRadarController {

    constructor(
        private readonly petsRadarService: PetsRadarService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    @Get('lost-pets')
    async getLostPets() {
        const cacheKey = 'lost_pets_active';
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) return cached;

        const data = await this.petsRadarService.getLostPets();
        await this.cacheManager.set(cacheKey, data, 60000);
        return data;
    }

    @Get('found-pets')
    async getFoundPets() {
        const cacheKey = 'found_pets_all';
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) return cached;

        const data = await this.petsRadarService.getFoundPets();
        await this.cacheManager.set(cacheKey, data, 60000);
        return data;
    }

    @Post('pets-radar/lost')
    async lostPets(@Body() lostPets: LostPetsRadarCDto) {
        await this.cacheManager.del('lost_pets_active');
        return await this.petsRadarService.createLostPets(lostPets);
    }

    @Post('pets-radar/found')
    async foundPets(@Body() foundPets: FoundPetsRadarCDto) {
        await this.cacheManager.del('found_pets_all');
        return await this.petsRadarService.createFoundPets(foundPets);
    }

}