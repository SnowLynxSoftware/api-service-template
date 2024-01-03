export interface IRawEnv {
  APP_KEY: string;
  CORS_ORIGIN: string;
  DB_CONNECTION_STRING: string;
}

export class EnvProvider {
  public static GetValidatedRawEnv(): IRawEnv {
    const defaultRawEnv: IRawEnv = {
      APP_KEY: "",
      CORS_ORIGIN: "",
      DB_CONNECTION_STRING: "",
    };

    const hostEnv = process.env;

    let errorMessage = "";

    if (!hostEnv.APP_KEY) {
      errorMessage += "APP_KEY ";
    } else {
      defaultRawEnv.APP_KEY = hostEnv.APP_KEY.toString();
    }

    if (!hostEnv.CORS_ORIGIN) {
      errorMessage += "CORS_ORIGIN ";
    } else {
      defaultRawEnv.CORS_ORIGIN = hostEnv.CORS_ORIGIN.toString();
    }

    if (!hostEnv.DB_CONNECTION_STRING) {
      errorMessage += "DB_CONNECTION_STRING ";
    } else {
      defaultRawEnv.DB_CONNECTION_STRING =
        hostEnv.DB_CONNECTION_STRING.toString();
    }

    if (errorMessage) {
      console.error(
        `REQUIRED ENV VARS ARE MISSING: [${errorMessage.trimEnd()}]`
      );
      process.exit(1);
    } else {
      return defaultRawEnv;
    }
  }
}
