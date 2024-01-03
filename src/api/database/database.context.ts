import { DataSource, EntityTarget, Entity } from "typeorm";
import { singleton } from "tsyringe";
import { AppDataSource } from "../providers/datasource.provider";

@singleton()
export class DatabaseContext {
  private _db: DataSource;

  public GetRepository(entity: EntityTarget<typeof Entity>) {
    return this._db.getRepository(entity);
  }

  constructor() {
    this._db = AppDataSource;
  }

  public async Initialize() {
    try {
      await this._db.initialize();
      if (this._db.isInitialized) {
        console.log("Database is connected!");
      } else {
        throw new Error("Database could not connect!");
      }
    } catch (error: any) {
      console.error(error.message);
      process.exit(1);
    }
  }
}
