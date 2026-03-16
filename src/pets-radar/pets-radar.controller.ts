import { Controller, Post } from '@nestjs/common';
import { PetsRadarService } from './pets-radar.service';

@Controller('pets-radar')
export class PetsRadarController {

    constructor(private readonly petsRadarService: PetsRadarService) {}

    @Post()
    async lostPets() {
        const result = await this.petsRadarService.createLostPets();
        return result;
    }

}
