/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TodoFacade } from './../../../../main/modules/todo/todoFacade';
import { TodoRepository } from './../../../../main/modules/todo/todoRepository';

export class TodoFacadeFactory {
  public static buildForTest(mock: any): TodoFacade {
    return new TodoFacade((mock as unknown) as TodoRepository);
  }
}

export function createTodoRepositoryMock() {
  const todoRepository = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getAll: jest.fn(),
    getTodoById: jest.fn()
  };
  return {
    todoRepository,
    clearTodoRepositoryMock: () => {
      todoRepository.create.mockClear();
      todoRepository.getAll.mockClear();
      todoRepository.getTodoById.mockClear();
      todoRepository.update.mockClear();
      todoRepository.remove.mockClear();
    }
  };
}
