import { TodoSchema } from './../../../../main/modules/todo/model/schemas/TodoSchema';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'mongodb';

// Mocked Values
export const mockTodoSchema = {
  _id: new ObjectId('5f4b50ec74470f5cb488f96f'),
  title: 'TODO title',
  content: 'TODO content'
};

export const getAllMockValue = [
  { _id: new ObjectId(), title: 'Title 1', content: 'Content 1' },
  { _id: new ObjectId(), title: 'Title 2', content: 'Content 2' }
];

// Mock Builders

export const repositoryCreateTodoCorrectly = (todoId: string): any => ({
  status: 'OK',
  todoId: todoId || '5f4b50ec74470f5cb488f96f'
});

export const repositoryCreateTodoFail = (): any => ({
  status: 'FAIL'
});

export const repositoryUpdatedCorrectly = (todoId: string): any => ({
  result: { ok: 1 },
  upsertedId: { _id: new ObjectId(todoId) }
});

export const buildTodoSchema = (
  todoId: string,
  title?: string,
  content?: string
): TodoSchema => ({
  _id: new ObjectId(todoId),
  title: title || 'TODO title',
  content: content || 'TODO content'
});
