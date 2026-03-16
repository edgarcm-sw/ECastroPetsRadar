import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { envs } from 'src/config/envs';

@Injectable()
export class EmailService {
    // SMTP
    // 
    private transpoter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_PASSWORD
        }
    });

    async sendEmail() : Promise<Boolean> {
        try {
            await this.transpoter.sendMail({
                to: "castromendezedgarleonel@gmail.com",
                subject: "Correo de prueba",
                html: "<h1>Esto es un correo de prueba</h1>"
            })
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}