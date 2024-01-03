import { BaseV1Controller } from "./base.v1.controller";
import { singleton } from "tsyringe";
import { FastifyReply, FastifyRequest } from "fastify";

@singleton()
export class SettingsV1Controller extends BaseV1Controller {
  constructor() {
    super();
    this._setupControllerItems();
  }

  private async GetAppSettings(_req: FastifyRequest, res: FastifyReply) {
    res.send("DYNAMIC MAGIC!");
  }

  private _setupControllerItems() {
    this._controllerPropItems = [
      {
        method: "GET",
        partialRoute: "/",
        handler: this.GetAppSettings.bind(this),
      },
    ];
  }
}
