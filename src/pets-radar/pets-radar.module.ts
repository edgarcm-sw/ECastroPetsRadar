import { Module } from '@nestjs/common';
import { PetsRadarService } from './pets-radar.service';
import { PetsRadarController } from './pets-radar.controller';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule],
  providers: [PetsRadarService],
  controllers: [PetsRadarController]
})
export class PetsRadarModule {}
