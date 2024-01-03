import "reflect-metadata";
import { container } from "tsyringe";
import { AppServer } from "./app-server";

const bootstrap = async () => {
  const appServer = container.resolve(AppServer);
  const address = await appServer.Start();
  console.log(`Server is listening at: [${address}]`);
};

bootstrap().catch((error: Error) => {
  console.error(error.message);
});
