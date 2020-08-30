import { RemoveTodoResult } from './model/schemas/RemoveTodoResult';
import { UpdateTodoData } from './model/schemas/UpdateTodoData';
import { Collection, UpdateWriteOpResult, ObjectId } from 'mongodb';
import { MongoDBClient } from '../../db/mongoDBClient';
import { TodoSchema } from './model/schemas/TodoSchema';
import { TodoData } from './model/schemas/TodoData';
import { InsertTodoResult } from './model/schemas/InsertTodoResult';

export class TodoRepository {
  private collection: Collection<TodoSchema> | undefined;

  constructor(mongoClient = new MongoDBClient()) {
    mongoClient
      .dbAsync()
      .then((db) => (this.collection = db.collection<TodoSchema>('todos')));
  }

  public getTodoById(todoId: string): Promise<TodoSchema | null> {
    if (!this.collection) {
      throw new Error('Mongo client is not initialized.');
    }
    return this.collection.findOne({ _id: new ObjectId(todoId) });
  }

  public getAll(): Promise<TodoSchema[]> {
    if (!this.collection) {
      throw new Error('Mongo client is not initialized.');
    }
    return this.collection.find({}).toArray();
  }

  public create(todoData: TodoData): Promise<InsertTodoResult> {
    if (!this.collection) {
      throw new Error('Mongo client is not initialized.');
    }

    return this.collection.insertOne(todoData as TodoSchema).then((e) => {
      return {
        status: e.result.ok === 1 ? 'OK' : 'FAIL',
        todoId: (e.insertedId as unknown) as string
      };
    });
  }

  public remove(todoId: string): Promise<RemoveTodoResult> {
    if (!this.collection) {
      throw new Error('Mongo client is not initialized.');
    }
    return this.collection
      .deleteOne({ _id: new ObjectId(todoId) })
      .then((e) => {
        return {
          status: e.result.ok === 1 ? 'REMOVED' : 'FAIL',
          removedTodo: todoId
        };
      });
  }

  public update(
    todoId: string,
    updatedData: UpdateTodoData
  ): Promise<UpdateWriteOpResult> {
    if (!this.collection) {
      throw new Error('Mongo client is not initialized.');
    }
    return this.collection.updateOne(
      { _id: new ObjectId(todoId) },
      { $set: updatedData }
    );
  }
}
