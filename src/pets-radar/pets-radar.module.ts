import { Module } from '@nestjs/common';
import { PetsRadarService } from './pets-radar.service';
import { PetsRadarController } from './pets-radar.controller';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LostPetsRadar } from 'src/core/db/entities/lost-pets-radar.entity';
import { FoundPetsRadar } from 'src/core/db/entities/found-pets-radar.entity';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([LostPetsRadar, FoundPetsRadar])
  ],
  providers: [PetsRadarService],
  controllers: [PetsRadarController]
})
export class PetsRadarModule {}
