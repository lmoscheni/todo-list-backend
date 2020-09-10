/**
 * @swagger
 *
 * components:
 *  schemas:
 *    CreateTodoBody:
 *      type: object
 *      required:
 *        - title
 *        - content
 *      properties:
 *        title:
 *          type: string
 *        content:
 *          type: string
 */
export interface CreateTodoBody {
  title: string;
  content: string;
}
