/**
 * @swagger
 *
 * components:
 *  schemas:
 *    UpdateTodoBody:
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
export interface UpdateTodoBody {
  title?: string;
  content?: string;
}
