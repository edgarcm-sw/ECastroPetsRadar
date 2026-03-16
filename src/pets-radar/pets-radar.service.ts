import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PetsRadarService {

    constructor(private readonly emailService: EmailService) {}

    async createLostPets() : Promise<Boolean> {
        const result = await this.emailService.sendEmail();
        return result;
    }

}
