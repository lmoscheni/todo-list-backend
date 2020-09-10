/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import pkg from '../../../package.json';

export function HealthCheck(currentConfig: any) {
  return (req: Request, res: Response) =>
    res.send({
      appVersion: pkg.version,
      author: pkg.author,
      nodeVersion: pkg.engines.node,
      status: 'OK',
      apiDocs: `http://${currentConfig.basePath}:${currentConfig.port}/api-docs`
    });
}
