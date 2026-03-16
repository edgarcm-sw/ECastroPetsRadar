import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { PetsRadarModule } from './pets-radar/pets-radar.module';

@Module({
  imports: [EmailModule, PetsRadarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
