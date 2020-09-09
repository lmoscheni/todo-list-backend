import swaggerJSDoc from 'swagger-jsdoc';
import pkg from '../../package.json';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: pkg.name,
      version: pkg.version
    }
  },
  apis: ['../main/modules/todo/todoController.ts']
};

export const swaggerSpec = swaggerJSDoc(options);
