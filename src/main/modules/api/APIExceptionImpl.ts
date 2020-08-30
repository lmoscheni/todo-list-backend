/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIException } from './APIException';

export class APIExceptionImpl implements APIException {
  code: number;
  message: string;
  data?: any;
  name: string;
  stack?: string | undefined;

  constructor(error: Error | any) {
    this.code = error.body.code;
    this.message = error.body.message;
    this.name = 'APIException';
  }
}
