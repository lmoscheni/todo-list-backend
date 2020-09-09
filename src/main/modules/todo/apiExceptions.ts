import { APIException } from '../api/APIException';

export class TodoNotFoundException implements APIException {
  name: string;
  code: number;
  message: string;
  data?: any;
  stack?: string | undefined;

  constructor(data: any) {
    this.name = this.constructor.name;
    this.code = 404;
    this.message = `Todo id[${data.todoId}] not found.`;
    this.data = data;
  }
}

export class TodoBadRequestException implements APIException {
  name: string;
  code: number;
  message: string;
  data?: any;
  stack?: string | undefined;

  constructor(data: any) {
    this.name = this.constructor.name;
    this.code = 400;
    this.message = `Todo id[${data.todoId}] its not valid.`;
    this.data = data;
  }
}

export class SystemAPIException implements APIException {
  name: string;
  code: number;
  message: string;
  data?: any;
  stack?: string | undefined;

  constructor(message?: string, data?: any, stack?: string) {
    this.name = this.constructor.name;
    this.code = 500;
    this.message = message ? message : `Server error.`;
    this.data = data;
    this.stack = stack;
  }
}
