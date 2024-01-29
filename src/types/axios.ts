export interface IError {
  message: string;
  field: string;
}

export interface IApiError {
  status: number;
  errors?: IError[];
}
