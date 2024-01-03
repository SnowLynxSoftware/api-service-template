import { container } from "tsyringe";
import { DataSource } from "typeorm";
import { EnvService } from "../services/env.service";

const envService = container.resolve(EnvService);

export const AppDataSource = new DataSource({
  url: envService.DBConnectionString,
  type: "postgres",
  connectTimeoutMS: 10000,
  schema: "public",
  applicationName: "vt-api",
  migrations: [__dirname + "/../../database/migrations/*.{ts,js}"],
  entities: [__dirname + "/../database/entities/*.{ts,js}"],
});
