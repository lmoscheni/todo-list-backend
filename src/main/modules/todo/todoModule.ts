import { Router } from 'express';
import { TodoController } from './todoController';
import { TodoRoutes } from './todoRoutes';

export class TodoModule {
  public routes: TodoRoutes;

  constructor(router: Router) {
    this.routes = new TodoRoutes(router, new TodoController());
  }
}
