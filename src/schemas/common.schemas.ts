// Common schema types and utilities for API endpoints

export interface BaseResponse {
  success: boolean;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Common schema components
export const commonSchemas = {
  pagination: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      limit: { type: 'number' },
      total: { type: 'number' },
      totalPages: { type: 'number' },
    },
  },
  error: {
    type: 'object',
    properties: {
      error: { type: 'string' },
      message: { type: 'string' },
    },
  },
  success: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
    },
  },
} as const;
