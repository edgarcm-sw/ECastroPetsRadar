import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { PetsRadarModule } from './pets-radar/pets-radar.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './core/db/data-source';
import { CacheModule } from '@nestjs/cache-manager';
import { envs } from './config/envs';
import { createKeyv } from '@keyv/redis';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({
        stores: [
          createKeyv(`redis://${envs.REDIS_HOST}:${envs.REDIS_PORT}`)
        ],
        ttl: 60000, 
      }),
    }),
    EmailModule,
    PetsRadarModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}