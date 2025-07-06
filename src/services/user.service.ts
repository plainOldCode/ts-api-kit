import { PrismaClient, DataState } from '@prisma/client';
import {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  UserQueryOptions,
  PaginatedResponse,
} from '../types';
import {
  UserNotFoundError,
  UserAlreadyExistsError,
  UserCreationError,
  UserUpdateError,
  UserDeletionError,
} from '../errors';

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllUsers(options: UserQueryOptions = {}): Promise<PaginatedResponse<UserDto>> {
    const { page = 1, limit = 10, state, search } = options;
    const skip = (page - 1) * limit;

    const where = {
      ...(state && { state }),
      ...(search && {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
          { firstName: { contains: search } },
          { lastName: { contains: search } },
        ],
      }),
    };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          state: true,
          created_at: true,
          updated_at: true,
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id: number): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        state: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new UserNotFoundError(`User with id ${id} not found`);
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        state: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }

  async createUser(userData: CreateUserDto): Promise<UserDto> {
    try {
      const existingUser = await this.getUserByEmail(userData.email);
      if (existingUser) {
        throw new UserAlreadyExistsError(`User with email ${userData.email} already exists`);
      }

      const user = await this.prisma.user.create({
        data: {
          ...userData,
          state: DataState.ACTIVE,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          state: true,
          created_at: true,
          updated_at: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw error;
      }
      throw new UserCreationError(
        `Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async updateUser(id: number, updateData: UpdateUserDto): Promise<UserDto> {
    try {
      await this.getUserById(id);

      if (updateData.email) {
        const existingUser = await this.getUserByEmail(updateData.email);
        if (existingUser && existingUser.id !== id) {
          throw new UserAlreadyExistsError(`Email ${updateData.email} is already in use`);
        }
      }

      const user = await this.prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          state: true,
          created_at: true,
          updated_at: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof UserNotFoundError || error instanceof UserAlreadyExistsError) {
        throw error;
      }
      throw new UserUpdateError(
        `Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.getUserById(id);

      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw error;
      }
      throw new UserDeletionError(
        `Failed to delete user: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async softDeleteUser(id: number): Promise<UserDto> {
    return this.updateUser(id, { state: DataState.DELETED });
  }

  async getUsersByState(state: DataState): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      where: { state },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        state: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: { created_at: 'desc' },
    });

    return users;
  }

  async getUserCount(): Promise<number> {
    return this.prisma.user.count();
  }

  async getUserCountByState(state: DataState): Promise<number> {
    return this.prisma.user.count({ where: { state } });
  }
}
