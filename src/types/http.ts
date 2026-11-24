export interface Paginator {
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
  next: string | null;
  next_page_number: number | null;
  previous: string | null;
  previous_page_number: number | null;
}

export interface PaginatedData<T> {
  paginator: Paginator;
  results: T[];
}

export interface PaginatedResponse<T> {
  status: number | boolean;
  success?: boolean;
  message: string;
  data: PaginatedData<T>;
}

export interface Response<T> {
  status: number | boolean;
  success?: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  type: string;
  code: string;
  message: string;
  field_name: string;
}
