import {
  SystemAPIException,
  TodoBadRequestException,
  TodoNotFoundException
} from './apiExceptions';
import { TodoAPIMapper } from './todoAPIMapper';
import { UpdateTodoBody } from './model/api/UpdateTodoBody';
import { Todo } from './model/api/Todo';
import { CreatedTodoResponse } from './model/api/CreatedTodoResponse';
import { CreateTodoBody } from './model/api/CreateTodoBody';
import { RemoveTodoResponse } from './model/api/RemoveTodoResponse';
import { TodoService } from './todoService';
import { APIException } from '../api/APIException';

export class TodoFacade {
  private service: TodoService;

  constructor(todoService = new TodoService()) {
    this.service = todoService;
  }

  public getAll(): Promise<Todo[] | APIException> {
    return this.service
      .getAll()
      .then((todos) => todos.map(TodoAPIMapper.toTodo))
      .catch((e) =>
        Promise.reject(new SystemAPIException(e.message, e.data, e.stack))
      );
  }

  public async getById(todoId: string): Promise<Todo | APIException> {
    try {
      await this.validateTodoId(todoId, {});
      const todo = await this.service.getById(todoId);

      return TodoAPIMapper.toTodo(todo);
    } catch {
      throw new SystemAPIException(undefined, { todoId });
    }
  }

  public async create(
    todoData: CreateTodoBody
  ): Promise<CreatedTodoResponse | APIException> {
    return this.service
      .create(todoData)
      .then((response) => ({ id: response.todoId }))
      .catch((e) =>
        Promise.reject(new SystemAPIException(e.message, e.data, e.stack))
      );
  }

  public async remove(
    todoId: string
  ): Promise<RemoveTodoResponse | APIException> {
    try {
      await this.validateTodoId(todoId, {});
      const removedTodo = await this.service.remove(todoId);

      return removedTodo;
    } catch {
      throw new SystemAPIException(undefined, { todoId });
    }
  }

  public async updateTodo(
    todoId: string,
    data: UpdateTodoBody
  ): Promise<Todo | APIException> {
    try {
      await this.validateTodoId(todoId, data);
      const updatedTodo = await this.service.update(todoId, data);

      return TodoAPIMapper.toTodo(updatedTodo);
    } catch {
      throw new SystemAPIException(undefined, { todoId, body: data });
    }
  }

  private async validateTodoId(
    todoId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
  ): Promise<void | APIException> {
    const { isValid, exists } = await this.service.validateId(todoId);

    if (!isValid) {
      throw new TodoBadRequestException({ todoId, ...data });
    }

    if (!exists) {
      throw new TodoNotFoundException({ todoId, ...data });
    }
  }
}
