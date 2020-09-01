/* eslint-disable no-console */
import { MongoDBConnector } from './db/mongoDbConnector';
import express, { Application, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import chalk from 'chalk';
import config from '../resources/config';

import { HealthCheck } from './middlewares/healthCheck';
import { ModuleConfig } from './modules/moduleConfig';

export class App {
  private expressApplication: Application;
  private router: Router;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
