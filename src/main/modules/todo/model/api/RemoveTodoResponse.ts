export interface RemoveTodoResponse {
  status: 'REMOVED' | 'FAIL';
  removedTodo: string;
}
