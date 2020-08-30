import { NextFunction, Request, Response, Router } from 'express';
import { APIException } from './APIException';

export class APIErrorHandler {
  static config(apiRouter: Router): void {
    apiRouter.use(APIErrorHandler.handleError);
  }

  static handleError(
    err: APIException | Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ): void {
    const { code = 500, ...others } = err as APIException;
    // eslint-disable-next-line no-console
    console.error('ERROR HANDLER', err);
    res.status(code).send(others);
  }
}
