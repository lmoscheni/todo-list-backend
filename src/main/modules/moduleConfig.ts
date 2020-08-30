import { APIModule } from './api/APIModule';
import { Router } from 'express';

export class ModuleConfig {
  private static apiModule: APIModule;

  static initModules(router: Router): void {
    this.apiModule = new APIModule(router);
  }
}
