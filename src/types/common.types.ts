export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

export interface DatabaseOptions {
  select?: Record<string, boolean>;
  include?: Record<string, boolean>;
  orderBy?: Record<string, 'asc' | 'desc'>;
}
