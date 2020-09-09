/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import express, { Application, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import chalk from 'chalk';
import { serve, setup } from 'swagger-ui-express';

import config from '../resources/config';
import { swaggerSpec } from '../resources/swaggerSpec';

import { HealthCheck } from './middlewares/healthCheck';
import { ModuleConfig } from './modules/moduleConfig';

import { MongoDBConnector } from './db/mongoDbConnector';

export class App {
  private expressApplication: Application;
  private router: Router;
  private config: any;
  private morganFormat: string;

  constructor() {
    this.expressApplication = express();
    this.router = express.Router();
    this.config = config();
    this.morganFormat = this.config.env === 'development' ? 'dev' : 'combined';

    this.configExpress();
    MongoDBConnector.connect(this.config).then(() => this.initModules());
  }

  private configExpress(): void {
    this.expressApplication.use(cors());
    this.expressApplication.use(helmet());
    this.expressApplication.use(express.json());
    this.expressApplication.use(express.urlencoded({ extended: true }));
    this.expressApplication.use(morgan(this.morganFormat));
    this.expressApplication.get('/health-check', HealthCheck);
    this.expressApplication.use('/api-docs', serve, setup(swaggerSpec));
    this.expressApplication.use(this.router);
  }

  private initModules(): void {
    ModuleConfig.initModules(this.router);
  }

  private showServerConnection(): void {
    console.log(
      chalk.bgGreen.black(`Running app on port ${this.config.port}`),
      chalk.green.bold(`http://localhost:${this.config.port}/`)
    );
  }

  private showHealthCheckURL(): void {
    console.log(
      chalk.green(
        `Check your app health on http://localhost:${this.config.port}/health-check`
      )
    );
  }

  public run(): void {
    this.expressApplication.listen(this.config.port, () => {
      this.showServerConnection();
      this.showHealthCheckURL();
    });
  }
}
