import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import chalk from 'chalk';
import config from '../resources/config';

import { HealthCheck } from './middlewares/healthCheck';

export class App {
  private expressApplication: express.Application;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private config: any;

  constructor() {
    this.expressApplication = express();
    this.config = config();

    this.configExpress();
  }

  private configExpress(): void {
    this.expressApplication.use(cors());
    this.expressApplication.use(helmet());
    this.expressApplication.get('/health-check', HealthCheck);
  }

  public run(): void {
    this.expressApplication.listen(this.config.port, () => {
      console.log(
        chalk.bgGreen.black(`Running app on port ${this.config.port}`),
        chalk.green.bold(`http://localhost:${this.config.port}/`)
      );
      console.log(
        chalk.green(
          `Check your app health on http://localhost:${this.config.port}/health-check`
        )
      );
    });
  }
}
