import { TodoFacade } from './../../../main/modules/todo/todoFacade';

import * as mocks from './mocks/todoRepository.mocks';
import {
  createTodoRepositoryMock,
  TodoFacadeFactory
} from './helpers/testHelpers';

const { todoRepository, clearTodoRepositoryMock } = createTodoRepositoryMock();
let facade: TodoFacade;

beforeEach(() => {
  clearTodoRepositoryMock();
  facade = TodoFacadeFactory.buildForTest(todoRepository);
});

describe('TodoFacade Test Suite', () => {
  test('Should create TODO correctly', async () => {
    const TODO_ID = '5f4b50ec74470f5cb488f96f';

    const createTodoBody = {
      title: 'Title for test',
      content: 'Content for test...'
    };

    todoRepository.create.mockResolvedValueOnce(
      mocks.repositoryCreateTodoCorrectly(TODO_ID)
    );

    const creationInfo = await facade.create(createTodoBody);

    expect(creationInfo.id).toEqual(TODO_ID);
  });

  test('Should fail TODO creation by mongo error', async () => {
    const createTodoBody = {
      title: 'Title for test',
      content: 'Content for test...'
    };

    todoRepository.create.mockResolvedValueOnce(
      mocks.repositoryCreateTodoFail()
    );

    try {
      await facade.create(createTodoBody);
      fail('Creation should have failed');
    } catch (e) {
      console.log(e);
    }
  });

  test('Should get all TODOs', async () => {
    todoRepository.getAll.mockResolvedValueOnce(mocks.getAllMockValue);

    const [fst, snd] = await facade.getAll();

    expect(fst).toEqual({
      id: mocks.getAllMockValue[0]._id,
      title: mocks.getAllMockValue[0].title,
      content: mocks.getAllMockValue[0].content
    });

    expect(snd).toEqual({
      id: mocks.getAllMockValue[1]._id,
      title: mocks.getAllMockValue[1].title,
      content: mocks.getAllMockValue[1].content
    });
  });

  test('Should get TODO correctly', async () => {
    todoRepository.getTodoById.mockResolvedValueOnce(mocks.mockTodoSchema);

    const todo = await facade.getById(
      (mocks.mockTodoSchema._id as unknown) as string
    );

    expect(todo).toEqual({
      id: mocks.mockTodoSchema._id,
      title: mocks.mockTodoSchema.title,
      content: mocks.mockTodoSchema.content
    });
  });

  test('Should can not find TODO', async () => {
    todoRepository.getTodoById.mockResolvedValueOnce(null);

    try {
      await facade.getById('todo');
      fail('This todo not exist');
    } catch (e) {
      console.log(e);
    }
  });

  test('Should update TODO correctly', async () => {
    const TODO_ID = '5f4b50ec74470f5cb488f96f';

    todoRepository.update.mockResolvedValueOnce(
      mocks.repositoryUpdatedCorrectly(TODO_ID)
    );

    const updateDataBody = { title: 'updated title' };

    const updatedTodoFromRepository = mocks.buildTodoSchema(
      TODO_ID,
      updateDataBody.title
    );

    todoRepository.getTodoById.mockResolvedValueOnce(updatedTodoFromRepository);

    const updatedTodoFromFacade = await facade.updateTodo(
      TODO_ID,
      updateDataBody
    );

    expect(updatedTodoFromFacade).toEqual({
      id: updatedTodoFromRepository._id,
      content: updatedTodoFromRepository.content,
      title: updateDataBody.title
    });
  });
});
