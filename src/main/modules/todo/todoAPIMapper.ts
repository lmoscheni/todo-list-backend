import { RemoveTodoResult } from './model/schemas/RemoveTodoResult';
import { InsertTodoResult } from './model/schemas/InsertTodoResult';
import { CreatedTodoResponse } from './model/api/CreatedTodoResponse';
import { TodoSchema } from './model/schemas/TodoSchema';
import { Todo } from './model/api/Todo';
import { RemoveTodoResponse } from './model/api/RemoveTodoResponse';

export class TodoAPIMapper {
  public static toTodo(todoSchema: TodoSchema): Todo {
    return {
      id: (todoSchema._id as unknown) as string,
      title: todoSchema.title,
      content: todoSchema.content
    };
  }

  public static toCreatedTodoResponse(
    insertTodoResult: InsertTodoResult
  ): CreatedTodoResponse {
    return {
      id: insertTodoResult.todoId
    };
  }

  public static toRemoveTodoResponse(
    removeTodoResult: RemoveTodoResult
  ): RemoveTodoResponse {
    return {
      status: removeTodoResult.status,
      removedTodo: removeTodoResult.removedTodo
    };
  }
}
