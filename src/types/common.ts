export interface IPagination {
  hasNextPage: boolean;
  hasPrevioudPage: boolean;
  itemCount: number;
  limit: number;
  page: number;
  pageCount: number;
}

export interface ResponseWithPagination<T> {
  data: T;
  meta: IPagination;
}
