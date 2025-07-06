import { BaseError } from './base.error';

export class UserNotFoundError extends BaseError {
  constructor(message: string = 'User not found') {
    super(message, 404);
  }
}

export class UserAlreadyExistsError extends BaseError {
  constructor(message: string = 'User already exists') {
    super(message, 409);
  }
}

export class InvalidUserDataError extends BaseError {
  constructor(message: string = 'Invalid user data') {
    super(message, 400);
  }
}

export class UserCreationError extends BaseError {
  constructor(message: string = 'Failed to create user') {
    super(message, 500);
  }
}

export class UserUpdateError extends BaseError {
  constructor(message: string = 'Failed to update user') {
    super(message, 500);
  }
}

export class UserDeletionError extends BaseError {
  constructor(message: string = 'Failed to delete user') {
    super(message, 500);
  }
}
