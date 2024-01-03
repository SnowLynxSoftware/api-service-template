import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export interface IV1ControllerPropItem {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  partialRoute: string;
  handler: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
}

export class BaseV1Controller {
  private readonly _version = "/v1";
  protected _controllerPropItems: IV1ControllerPropItem[];

  constructor() {
    this._controllerPropItems = [];
  }

  public BuildFastifyRoutesForController(
    parentRoute: string,
    fastifyInstance: FastifyInstance,
  ) {
    for (const item of this._controllerPropItems) {
      console.log(parentRoute + this._version + item.partialRoute);
      fastifyInstance.route({
        method: item.method,
        url: parentRoute + this._version + item.partialRoute,
        handler: item.handler,
      });
    }
  }
}
