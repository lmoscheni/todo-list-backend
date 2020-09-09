import { CreateTodoBody } from './model/api/CreateTodoBody';
import { Request, Response, NextFunction } from 'express';
import { TodoFacade } from './todoFacade';

export class TodoController {
  private facade: TodoFacade;

  constructor(todoFacade = new TodoFacade()) {
    this.facade = todoFacade;
  }

  /**
   * @swagger
   * /api/todo:
   *  post:
   *    description: Create TODO
   *    produces:
   *      - application/json
   */
  public create(req: Request, res: Response, next: NextFunction): void {
    this.facade
      .create(req.body as CreateTodoBody)
      .then((_) => res.send(_))
      .catch(next);
  }

  public getAll(req: Request, res: Response, next: NextFunction): void {
    this.facade
      .getAll()
      .then((_) => res.send(_))
      .catch(next);
  }

  public getById(req: Request, res: Response, next: NextFunction): void {
    this.facade
      .getById(req.params.todoId)
      .then((_) => res.send(_))
      .catch(next);
  }

  public update(req: Request, res: Response, next: NextFunction): void {
    this.facade
      .updateTodo(req.params.todoId, req.body)
      .then((_) => res.send(_))
      .catch(next);
  }

  public remove(req: Request, res: Response, next: NextFunction): void {
    this.facade
      .remove(req.params.todoId)
      .then((_) => res.send(_))
      .catch(next);
  }
}
