import { envs } from "src/config/envs";
import { LostPetsRadar } from "./entities/lost-pets-radar.entity";
import { DataSourceOptions } from "typeorm";
import { DataSource } from "typeorm";
import { FoundPetsRadar } from "./entities/found-pets-radar.entity";

export const dataSourceOptions : DataSourceOptions = {
      host: envs.DB_HOST,
      type: 'postgres',
      port: envs.DB_PORT,
      database: envs.DB_NAME,
      username: envs.DB_USER,
      password: envs.DB_PASSWORD,
      entities: [LostPetsRadar, FoundPetsRadar],
      synchronize: false,
      migrations: ["dist/core/db/migrations/*"]
    };

export const dataSource = new DataSource(dataSourceOptions)