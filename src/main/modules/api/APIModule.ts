/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import chalk from 'chalk';
import { TodoModule } from '../todo/todoModule';
import { APIErrorHandler } from './APIErrorHandler';

export class APIModule {
  private modules: any[] = [];

  constructor(app: Router) {
    const apiRouter = Router();

    this.modules.push(new TodoModule(apiRouter));

    APIErrorHandler.config(apiRouter);

    app.use('/api', apiRouter);

    this.modules.forEach(this.displayModuleInfo);
  }

  private displayModuleInfo(module: any): void {
    // eslint-disable-next-line no-console
    console.log(
      chalk.bgBlue.hex('#000')(
        `${chalk(module.constructor.name)} initiated correctly.`
      )
    );
  }
}
