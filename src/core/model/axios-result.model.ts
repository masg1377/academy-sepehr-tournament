export interface IAxiosResult<T> {
  result: T | undefined;
  error: string;
  is_success: boolean;
  message_code: string;
  result_count?: number;
  message?: string;
  total_count?: number;
}

export interface IAxiosEntityResult<T> extends IAxiosResult<T> {
  result_count: number;
}

export interface ITemplateAxiosResult<T> {
  Result: T | undefined;
  ErrorCode: number;
  IsSuccess: boolean;
  Message: string;
}
