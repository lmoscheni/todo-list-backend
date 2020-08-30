import { Router } from 'express';
import { TodoController } from './todoController';

export class TodoRoutes {
  private routeController: TodoController;

  constructor(
    router: Router,
    routeController: TodoController = new TodoController()
  ) {
    this.routeController = routeController;
    this.configureRoutes(router);
  }

  private configureRoutes(router: Router) {
    router.get(
      '/todos/:todoId',
      this.routeController.getById.bind(this.routeController)
    );

    router.get(
      '/todos',
      this.routeController.getAll.bind(this.routeController)
    );

    router.post(
      '/todos',
      this.routeController.create.bind(this.routeController)
    );

    router.delete(
      '/todos/:todoId',
      this.routeController.remove.bind(this.routeController)
    );

    router.put(
      '/todos/:todoId',
      this.routeController.update.bind(this.routeController)
    );
  }
}
