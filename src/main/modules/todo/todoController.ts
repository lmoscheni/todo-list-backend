import { CreateTodoBody } from './model/api/CreateTodoBody';
import { Request, Response, NextFunction } from 'express';
import { TodoFacade } from './todoFacade';

/**
 * @swagger
 * tags:
 *  name: Todo Controller
 *  description: CRUDL Todo Entity
 */
export class TodoController {
  private facade: TodoFacade;

  constructor(todoFacade = new TodoFacade()) {
    this.facade = todoFacade;
  }

  /**
   * @swagger
   * /todos:
   *  post:
   *    tags: [Todo Controller]
   *    description: Create TODO
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateTodoBody'
   *    responses:
   *      '200':
   *        description: OK
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreatedTodoResponse'
   */
  public create(req: Request, res: Response, next: NextFunction): void {
    this.facade
      .create(req.body as CreateTodoBody)
      .then((_) => res.send(_))
      .catch(next);
  }

  /**
   * @swagger
   * /todos:
   *  get:
   *    tags: [Todo Controller]
   *    description: Get All TODOs
   *    responses:
   *      '200':
   *        description: OK
   *        content:
   *          application/json:
   *            type: array
   *            items:
   *              schema:
   *                $ref: '#/components/schemas/Todo'
   */
  public getAll(req: Request, res: Response, next: NextFunction): void {
    this.facade
      .getAll()
      .then((_) => res.send(_))
      .catch(next);
  }

  /**
   * @swagger
   * /todos/{todoId}:
   *  get:
   *    tags: [Todo Controller]
   *    description: Get TODO by ID
   *    parameters:
   *      - in: path
   *        name: todoId
   *        required: true
   *        type: string
   *    responses:
   *      '200':
   *        description: OK
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Todo'
   */
  public getById(req: Request, res: Response, next: NextFunction): void {
    this.facade
      .getById(req.params.todoId)
      .then((_) => res.send(_))
      .catch(next);
  }

  /**
   * @swagger
   * /todos/{todoId}:
   *  put:
   *    tags: [Todo Controller]
   *    description: Get All TODOs
   *    parameters:
   *      - in: path
   *        name: todoId
   *        required: true
   *        type: string
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/UpdateTodoBody'
   *    responses:
   *      '200':
   *        description: OK
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Todo'
   */
  public update(req: Request, res: Response, next: NextFunction): void {
    this.facade
      .updateTodo(req.params.todoId, req.body)
      .then((_) => res.send(_))
      .catch(next);
  }

  /**
   * @swagger
   * /todos/{todoId}:
   *  delete:
   *    tags: [Todo Controller]
   *    description: Remove TODO by id
   *    parameters:
   *      - in: path
   *        name: todoId
   *        required: true
   *        type: string
   *    responses:
   *      '200':
   *        description: OK
   *        content:
   *          application/json:
   *            type: array
   *            items:
   *              schema:
   *                $ref: '#/components/schemas/RemoveTodoResponse'
   */
  public remove(req: Request, res: Response, next: NextFunction): void {
    this.facade
      .remove(req.params.todoId)
      .then((_) => res.send(_))
      .catch(next);
  }
}
