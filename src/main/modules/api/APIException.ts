export interface APIException extends Error {
  code: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
