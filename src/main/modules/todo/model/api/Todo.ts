/**
 * @swagger
 *
 * components:
 *  schemas:
 *    Todo:
 *      type: object
 *      required:
 *        - id
 *        - content
 *      properties:
 *        id:
 *          type: string
 *        title:
 *          type: string
 *        content:
 *          type: string
 */
export interface Todo {
  id: string;
  title?: string;
  content: string;
}
