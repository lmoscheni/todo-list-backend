import { RemoveTodoResult } from './model/schemas/RemoveTodoResult';
import { UpdateTodoData } from './model/schemas/UpdateTodoData';
import { Collection, UpdateWriteOpResult, ObjectId } from 'mongodb';
import { TodoSchema } from './model/schemas/TodoSchema';
import { TodoData } from './model/schemas/TodoData';
import { InsertTodoResult } from './model/schemas/InsertTodoResult';
import { MongoDBConnector } from '../../db/mongoDbConnector';

export class TodoRepository {
  private collection: Collection<TodoSchema>;

  constructor() {
    this.collection = MongoDBConnector.getTodoAppDB().collection<TodoSchema>(
      'todos'
    );
  }

  public validateId(id: string): Promise<boolean> {
    return ObjectId.isValid(id) ? Promise.resolve(true) : Promise.reject(false);
  }

  public exists(id: string): Promise<boolean> {
    return this.collection
      .find({ _id: new ObjectId(id) })
      .count()
      .then((count) => count > 0);
  }

  public getTodoById(todoId: string): Promise<TodoSchema | null> {
    return this.collection.findOne({ _id: new ObjectId(todoId) });
  }

  public getAll(): Promise<TodoSchema[]> {
    return this.collection.find({}).toArray();
  }

  public create(todoData: TodoData): Promise<InsertTodoResult> {
    return this.collection.insertOne(todoData as TodoSchema).then((e) => {
      return {
        status: e.result.ok === 1 ? 'OK' : 'FAIL',
        todoId: (e.insertedId as unknown) as string
      };
    });
  }

  public remove(todoId: string): Promise<RemoveTodoResult> {
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
    return this.collection.updateOne(
      { _id: new ObjectId(todoId) },
      { $set: updatedData }
    );
  }
}
