/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import swaggerJSDoc from 'swagger-jsdoc';
import pkg from '../../package.json';

export function buildSwaggerSpec(currentConfig: any): object {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: pkg.name,
        version: pkg.version
      },
      servers: [
        {
          url: `http://${currentConfig.basePath}:${currentConfig.port}/api`
        }
      ]
    },
    apis: [
      'src/main/modules/todo/todoController.ts',
      'src/main/modules/todo/model/api/*.ts'
    ]
  };
  return swaggerJSDoc(options);
}
