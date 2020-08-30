import { ObjectId } from 'mongodb';

export interface TodoSchema {
  _id: ObjectId;
  title?: string;
  content: string;
}
