/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TodoSchema } from './model/schemas/TodoSchema';
import { UpdateTodoBody } from './model/api/UpdateTodoBody';
import { RemoveTodoResult } from './model/schemas/RemoveTodoResult';
import { CreateTodoBody } from './model/api/CreateTodoBody';
import { InsertTodoResult } from './model/schemas/InsertTodoResult';
import { TodoRepository } from './todoRepository';

interface TodoIdValidation {
  isValid: boolean;
  exists: boolean;
}

/**
 * Exception with basic http representation of failure (not 2xx)
 * Basically show code (HTTP_STATUS_CODE) and any data related
 */
export class TodoServiceException extends Error {
  private code: number;
  private data?: any;

  constructor(code?: number, data?: any) {
    super();
    this.code = code || 500;
    this.data = data;
  }
}

export class TodoService {
  private repository: TodoRepository;

  constructor(todoRepository = new TodoRepository()) {
    this.repository = todoRepository;
  }

  public getAll(): Promise<TodoSchema[]> {
    return this.repository.getAll();
  }

  public getById(todoId: string): Promise<TodoSchema> {
    return this.repository
      .getTodoById(todoId)
      .then((todo) => todo as TodoSchema);
  }

  public create(todoData: CreateTodoBody): Promise<InsertTodoResult> {
    return this.repository.create(todoData).then((insertTodoResult) => {
      if (insertTodoResult.status === 'FAIL') {
        throw new TodoServiceException(500, {
          status: insertTodoResult.status
        });
      }
      return insertTodoResult;
    });
  }

  public remove(todoId: string): Promise<RemoveTodoResult> {
    return this.repository.remove(todoId).then((removeTodoResult) => {
      if (removeTodoResult.status === 'FAIL') {
        throw new TodoServiceException(500, {
          status: removeTodoResult.status
        });
      }
      return removeTodoResult;
    });
  }

  public update(todoId: string, data: UpdateTodoBody): Promise<TodoSchema> {
    return this.repository
      .update(todoId, data)
      .then((updateOperationResult) => {
        if (updateOperationResult.result.ok !== 1) {
          throw new TodoServiceException();
        }
      })
      .then(() => this.getById(todoId));
  }

  public async validateId(todoId: string): Promise<TodoIdValidation> {
    const isValid = await this.repository.validateId(todoId);
    const exists = await this.repository.exists(todoId);
    return { isValid, exists };
  }
}
