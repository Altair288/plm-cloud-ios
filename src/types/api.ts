/** Standard PLM Cloud API response envelope. */
export interface ApiResponse<T = unknown> {
  code: string;
  message: string;
  data: T;
  traceId?: string;
}

/** Paginated list result. */
export interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** Normalised error thrown after HTTP/API failures. */
export interface ApiError {
  /** Backend business code, e.g. "CATEGORY_NOT_FOUND". */
  code: string;
  message: string;
  /** HTTP status code when available. */
  status?: number;
}

/** Query parameters for paginated list requests. */
export interface PageQuery {
  page?: number;
  pageSize?: number;
  keyword?: string;
}
