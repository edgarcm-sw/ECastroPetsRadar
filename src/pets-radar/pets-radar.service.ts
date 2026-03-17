import { Injectable } from '@nestjs/common';
import { LostPetsRadar } from 'src/core/interfaces/lost-pets-radar.interface';
import { EmailOptions } from 'src/core/interfaces/mail-options.interface';
import { EmailService } from 'src/email/email.service';
import { generatePetRadarEmailTemplate } from './templates/pets-radar-email.template';

@Injectable()
export class PetsRadarService {

    constructor(private readonly emailService: EmailService) {}

    async createLostPets(lostPets: LostPetsRadar) : Promise<Boolean> {
        const template = generatePetRadarEmailTemplate(lostPets);
        const options : EmailOptions = {
            to: "castromendezedgarleonel@gmail.com",
            subject: lostPets.name,
            html: template
        }
        const result = await this.emailService.sendEmail(options);
        return result;
    }

}
