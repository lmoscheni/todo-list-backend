export interface RemoveTodoResult {
  status: 'REMOVED' | 'FAIL';
  removedTodo: string;
}
