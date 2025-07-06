import { DataState } from '@prisma/client';

export interface UserDto {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  state: DataState;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  description?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  state?: DataState;
}

export interface UserQueryOptions {
  page?: number;
  limit?: number;
  state?: DataState;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
