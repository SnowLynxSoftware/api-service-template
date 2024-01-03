import { singleton } from "tsyringe";
import { DatabaseContext } from "../database/database.context";
import { AppControllerManager } from "../controllers/controller.manager";
import { FastifyInstance } from "fastify";

@singleton()
export class AppInitService {
  constructor(
    private readonly _dbContext: DatabaseContext,
    private readonly _controllerManager: AppControllerManager,
  ) {}

  public async InitializeApplication(fastifyInstance: FastifyInstance) {
    await this._dbContext.Initialize();
    this._controllerManager.InitializeAllControllers(fastifyInstance);
  }
}
