import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyMiddie from "@fastify/middie";
import fastify, { FastifyInstance } from "fastify";
import { singleton } from "tsyringe";
import { EnvService } from "./services/env.service";
import { AppInitService } from "./services/init.service";

@singleton()
export class AppServer {
  private _app: FastifyInstance;

  constructor(
    private readonly _envService: EnvService,
    private readonly _initService: AppInitService,
  ) {
    this._app = fastify({
      logger: false,
      ignoreTrailingSlash: true,
    });
    this._preInit();
  }

  private _preInit() {
    this._app.register(fastifyHelmet);
    this._app.register(fastifyCookie, {
      secret: this._envService.AppKey,
    });
    this._app.register(fastifyCors, {
      origin: this._envService.CorsOrigin,
    });
    this._app.register(fastifyMiddie);

    this._app.get("/health", (_req, res) => {
      res.send("ok");
    });
  }

  public async Start() {
    await this._initService.InitializeApplication(this._app);
    return this._app.listen({ host: "0.0.0.0", port: 3000 });
  }
}
