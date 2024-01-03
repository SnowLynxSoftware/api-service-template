import { singleton } from "tsyringe";
import { EnvProvider, IRawEnv } from "../providers/env.provider";

@singleton()
export class EnvService {
  private _rawEnv: IRawEnv;

  constructor() {
    this._rawEnv = EnvProvider.GetValidatedRawEnv();
  }

  public get AppKey(): string {
    return this._rawEnv.APP_KEY;
  }

  public get CorsOrigin(): string {
    return this._rawEnv.CORS_ORIGIN;
  }

  public get DBConnectionString(): string {
    return this._rawEnv.DB_CONNECTION_STRING;
  }
}
