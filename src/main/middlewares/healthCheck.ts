import { Request, Response } from 'express';
import pkg from '../../../package.json';

export function HealthCheck(req: Request, res: Response): void {
  res.send({
    appVersion: pkg.version,
    author: pkg.author,
    nodeVersion: pkg.engines.node,
    status: 'OK',
    apiDocs: ''
  });
}
