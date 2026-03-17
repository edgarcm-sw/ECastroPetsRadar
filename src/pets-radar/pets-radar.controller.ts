import { Body, Controller, Post } from '@nestjs/common';
import { PetsRadarService } from './pets-radar.service';
import type { LostPetsRadarCDto } from 'src/core/interfaces/lost-pets-radar.interface';
import type { FoundPetsRadarCDto } from 'src/core/interfaces/found-pets-radar.interface';

@Controller('pets-radar')
export class PetsRadarController {

    constructor(private readonly petsRadarService: PetsRadarService) {}

    @Post('lost')
    async lostPets(@Body() lostPets: LostPetsRadarCDto) {
        const result = await this.petsRadarService.createLostPets(lostPets);
        return result;
    }

    @Post('found')
    async foundPets(@Body() foundPets: FoundPetsRadarCDto) {
        const result = await this.petsRadarService.createFoundPets(foundPets);
        return result;
    }

}
