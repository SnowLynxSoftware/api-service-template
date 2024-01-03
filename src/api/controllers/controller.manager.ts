import { singleton } from "tsyringe";
import { FastifyInstance } from "fastify";
import { SettingsV1Controller } from "./v1/settings.v1.controller";

@singleton()
export class AppControllerManager {
  constructor(private readonly _v1SettingsController: SettingsV1Controller) {}

  private _setupV1Controllers(fastifyInstance: FastifyInstance) {
    this._v1SettingsController.BuildFastifyRoutesForController(
      "/settings",
      fastifyInstance,
    );
  }

  public InitializeAllControllers(fastifyInstance: FastifyInstance) {
    this._setupV1Controllers(fastifyInstance);
  }
}
