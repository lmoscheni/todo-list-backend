import { UpdateTodoBody } from './model/api/UpdateTodoBody';
import { Todo } from './model/api/Todo';
import { CreatedTodoResponse } from './model/api/CreatedTodoResponse';
import { CreateTodoBody } from './model/api/CreateTodoBody';
import { TodoRepository } from './todoRepository';
import { RemoveTodoResponse } from './model/api/RemoveTodoResponse';

export class TodoFacade {
  private repository: TodoRepository;

  constructor(todoRepository = new TodoRepository()) {
    this.repository = todoRepository;
  }

  public getAll(): Promise<Todo[]> {
    return this.repository.getAll().then((todos) =>
      todos.map(({ _id, ...others }) => ({
        id: (_id as unknown) as string,
        ...others
      }))
    );
  }

  public getById(todoId: string): Promise<Todo> {
    return this.repository.getTodoById(todoId).then((todo) => {
      if (!todo) {
        throw new Error();
      }
      const { _id, ...others } = todo;
      return { id: (_id as unknown) as string, ...others };
    });
  }

  public create(todoData: CreateTodoBody): Promise<CreatedTodoResponse> {
    return this.repository.create(todoData).then((response) => {
      if (response.status === 'FAIL') {
        throw new Error();
      }
      return { id: response.todoId || 'unknown' }; // ASCO
    });
  }

  public remove(todoId: string): Promise<RemoveTodoResponse> {
    return this.repository.remove(todoId).then((removeOperation) => {
      if (removeOperation.status === 'FAIL') {
        throw new Error();
      }
      return removeOperation;
    });
  }

  public updateTodo(todoId: string, data: UpdateTodoBody): Promise<Todo> {
    return this.repository
      .update(todoId, data)
      .then((updateOperationResult) => {
        if (updateOperationResult.result.ok !== 1) {
          throw new Error();
        }
      })
      .then(() => this.getById(todoId));
  }
}
