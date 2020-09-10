/**
 * @swagger
 *
 * components:
 *  schemas:
 *    RemoveTodoResponse:
 *      type: object
 *      required:
 *        - status
 *        - removedTodo
 *      properties:
 *        status:
 *          type: string
 *        removedTodo:
 *          type: string
 */
export interface RemoveTodoResponse {
  status: 'REMOVED' | 'FAIL';
  removedTodo: string;
}
