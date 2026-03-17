import { Body, Controller, Post } from '@nestjs/common';
import { PetsRadarService } from './pets-radar.service';
import type { LostPetsRadar } from 'src/core/interfaces/lost-pets-radar.interface';

@Controller('pets-radar')
export class PetsRadarController {

    constructor(private readonly petsRadarService: PetsRadarService) {}

    @Post()
    async lostPets(@Body() lostPets: LostPetsRadar) {
        const result = await this.petsRadarService.createLostPets(lostPets);
        return result;
    }

}
