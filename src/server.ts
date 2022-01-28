import express from 'express';
import { initialize } from 'express-openapi';
import swaggerUI from 'swagger-ui-express';
import { urlencoded as urlencodedMiddleware, json as jsonMiddleware } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { apiDoc } from './docs';
import { operations } from './controllers';
import { serverConfig } from './configs/server.config';
import helmet from 'helmet';
import { initMongoDB } from './database/mongodb-init';
import { Logger } from './utils/logger';

export class Server {
  private app: express.Application;

  constructor() {
    this.app = express();

    // Apply parser middlewares
    this.app.use(urlencodedMiddleware({ extended: true }));
    this.app.use(jsonMiddleware());

    // Apply security middlewares
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());

    // Init the app from the openapi docs
    initialize({
      apiDoc: apiDoc,
      app: this.app,
      operations,
    });

    // Apply the swagger middleware
    this.app.use(
      `${serverConfig.API_BASE_PATH}/docs`,
      swaggerUI.serve,
      swaggerUI.setup(undefined, {
        swaggerUrl: `${serverConfig.API_BASE_PATH}/api-docs`,
      }),
    );
  }

  public start = async (): Promise<void> => {

    // Initialize the Mongo Database before starting the app
    await initMongoDB();

    Logger.info(`I'm trying to connect on the port:::::::${serverConfig.PORT}`);

    this.app.listen(serverConfig.PORT, () => {
      Logger.info(`Running server on from port:::::::${serverConfig.PORT}`);
    });

    // this.app.listen(3000, "192.168.0.130", () => {
    //   console.log('Server started successfully on ' + "192.168.0.130:" + serverConfig.PORT + "/api/docs/");
    // })
  };
}
