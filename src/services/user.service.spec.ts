import { DataState } from '@prisma/client';
import { UserService } from './user.service';
import {
  prismaMock,
  resetMocks,
  createMockPrismaUser,
  createMockPrismaUserList,
  createMockCreateUserDto,
  createMockUpdateUserDto,
  prismaUserToDto,
} from '../test-utils';
import {
  UserNotFoundError,
  UserAlreadyExistsError,
  UserCreationError,
  UserUpdateError,
  UserDeletionError,
} from '../errors';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    resetMocks();
    userService = new UserService(prismaMock);
  });

  describe('getAllUsers', () => {
    it('should return paginated users with default options', async () => {
      // Arrange
      const mockPrismaUsers = createMockPrismaUserList(3);
      const selectedUsers = mockPrismaUsers.map(prismaUserToDto); // What Prisma returns with select
      const totalCount = 25;

      prismaMock.user.findMany.mockResolvedValue(selectedUsers as any);
      prismaMock.user.count.mockResolvedValue(totalCount);

      // Act
      const result = await userService.getAllUsers();

      // Assert
      expect(result).toEqual({
        data: selectedUsers,
        pagination: {
          page: 1,
          limit: 10,
          total: totalCount,
          totalPages: 3,
        },
      });
      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
        where: {},
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          state: true,
          created_at: true,
          updated_at: true,
        },
        skip: 0,
        take: 10,
        orderBy: { created_at: 'desc' },
      });
    });

    it('should return paginated users with custom options', async () => {
      // Arrange
      const mockUsers = createMockPrismaUserList(2);
      const options = { page: 2, limit: 5, state: DataState.ACTIVE, search: 'john' };

      prismaMock.user.findMany.mockResolvedValue(mockUsers.map(prismaUserToDto) as any);
      prismaMock.user.count.mockResolvedValue(12);

      // Act
      const result = await userService.getAllUsers(options);

      // Assert
      expect(result.pagination).toEqual({
        page: 2,
        limit: 5,
        total: 12,
        totalPages: 3,
      });
      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
        where: {
          state: DataState.ACTIVE,
          OR: [
            { name: { contains: 'john' } },
            { email: { contains: 'john' } },
            { firstName: { contains: 'john' } },
            { lastName: { contains: 'john' } },
          ],
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
        skip: 5,
        take: 5,
        orderBy: { created_at: 'desc' },
      });
    });

    it('should handle search with only state filter', async () => {
      // Arrange
      const mockUsers = createMockPrismaUserList(1);
      const options = { state: DataState.INACTIVE };

      prismaMock.user.findMany.mockResolvedValue(mockUsers.map(prismaUserToDto) as any);
      prismaMock.user.count.mockResolvedValue(1);

      // Act
      await userService.getAllUsers(options);

      // Assert
      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { state: DataState.INACTIVE },
        })
      );
    });
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      // Arrange
      const mockUser = createMockPrismaUser();
      prismaMock.user.findUnique.mockResolvedValue(prismaUserToDto(mockUser) as any);

      // Act
      const result = await userService.getUserById(1);

      // Assert
      expect(result).toEqual(prismaUserToDto(mockUser));
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
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
    });

    it('should throw UserNotFoundError when user not found', async () => {
      // Arrange
      prismaMock.user.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.getUserById(999)).rejects.toThrow(UserNotFoundError);
      await expect(userService.getUserById(999)).rejects.toThrow('User with id 999 not found');
    });
  });

  describe('getUserByEmail', () => {
    it('should return user when found', async () => {
      // Arrange
      const mockUser = createMockPrismaUser();
      prismaMock.user.findUnique.mockResolvedValue(prismaUserToDto(mockUser) as any);

      // Act
      const result = await userService.getUserByEmail('test@example.com');

      // Assert
      expect(result).toEqual(prismaUserToDto(mockUser));
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
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
    });

    it('should return null when user not found', async () => {
      // Arrange
      prismaMock.user.findUnique.mockResolvedValue(null);

      // Act
      const result = await userService.getUserByEmail('nonexistent@example.com');

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create user successfully', async () => {
      // Arrange
      const createUserDto = createMockCreateUserDto();
      const mockUser = createMockPrismaUser();

      prismaMock.user.findUnique.mockResolvedValue(null); // Email not exists
      prismaMock.user.create.mockResolvedValue(prismaUserToDto(mockUser) as any);

      // Act
      const result = await userService.createUser(createUserDto);

      // Assert
      expect(result).toEqual(prismaUserToDto(mockUser));
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
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
    });

    it('should throw UserAlreadyExistsError when email already exists', async () => {
      // Arrange
      const createUserDto = createMockCreateUserDto();
      const existingUser = createMockPrismaUser();

      prismaMock.user.findUnique.mockResolvedValue(prismaUserToDto(existingUser) as any);

      // Act & Assert
      await expect(userService.createUser(createUserDto)).rejects.toThrow(UserAlreadyExistsError);
      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        `User with email ${createUserDto.email} already exists`
      );
    });

    it('should throw UserCreationError when creation fails', async () => {
      // Arrange
      const createUserDto = createMockCreateUserDto();

      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(userService.createUser(createUserDto)).rejects.toThrow(UserCreationError);
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      // Arrange
      const userId = 1;
      const updateData = createMockUpdateUserDto();
      const existingUser = createMockPrismaUser();
      const updatedUser = createMockPrismaUser({ ...updateData });

      prismaMock.user.findUnique.mockResolvedValueOnce(prismaUserToDto(existingUser) as any); // getUserById check
      prismaMock.user.findUnique.mockResolvedValueOnce(null); // Email availability check
      prismaMock.user.update.mockResolvedValue(prismaUserToDto(updatedUser) as any);

      // Act
      const result = await userService.updateUser(userId, updateData);

      // Assert
      expect(result).toEqual(prismaUserToDto(updatedUser));
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: userId },
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
    });

    it('should throw UserNotFoundError when user does not exist', async () => {
      // Arrange
      const userId = 999;
      const updateData = createMockUpdateUserDto();

      prismaMock.user.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.updateUser(userId, updateData)).rejects.toThrow(UserNotFoundError);
    });

    it('should throw UserAlreadyExistsError when email is already taken by another user', async () => {
      // Arrange
      const userId = 1;
      const updateData = createMockUpdateUserDto({ email: 'taken@example.com' });
      const existingUser = createMockPrismaUser();
      const emailOwner = createMockPrismaUser({ id: 2, email: 'taken@example.com' });

      prismaMock.user.findUnique.mockResolvedValueOnce(prismaUserToDto(existingUser) as any); // getUserById check
      prismaMock.user.findUnique.mockResolvedValueOnce(emailOwner); // Email availability check

      // Act & Assert
      await expect(userService.updateUser(userId, updateData)).rejects.toThrow(
        UserAlreadyExistsError
      );
    });

    it('should allow updating email to same user email', async () => {
      // Arrange
      const userId = 1;
      const updateData = createMockUpdateUserDto({ email: 'test@example.com' });
      const existingUser = createMockPrismaUser({ id: 1, email: 'test@example.com' });
      const updatedUser = createMockPrismaUser({ ...updateData });

      prismaMock.user.findUnique.mockResolvedValueOnce(prismaUserToDto(existingUser) as any); // getUserById check
      prismaMock.user.findUnique.mockResolvedValueOnce(prismaUserToDto(existingUser) as any); // Email availability check (same user)
      prismaMock.user.update.mockResolvedValue(prismaUserToDto(updatedUser) as any);

      // Act
      const result = await userService.updateUser(userId, updateData);

      // Assert
      expect(result).toEqual(prismaUserToDto(updatedUser));
    });

    it('should throw UserUpdateError when update fails', async () => {
      // Arrange
      const userId = 1;
      const updateData = createMockUpdateUserDto();
      const existingUser = createMockPrismaUser();

      prismaMock.user.findUnique.mockResolvedValueOnce(prismaUserToDto(existingUser) as any);
      prismaMock.user.findUnique.mockResolvedValueOnce(null);
      prismaMock.user.update.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(userService.updateUser(userId, updateData)).rejects.toThrow(UserUpdateError);
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      // Arrange
      const userId = 1;
      const existingUser = createMockPrismaUser();

      prismaMock.user.findUnique.mockResolvedValue(prismaUserToDto(existingUser) as any);
      prismaMock.user.delete.mockResolvedValue(prismaUserToDto(existingUser) as any);

      // Act
      await userService.deleteUser(userId);

      // Assert
      expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });

    it('should throw UserNotFoundError when user does not exist', async () => {
      // Arrange
      const userId = 999;

      prismaMock.user.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.deleteUser(userId)).rejects.toThrow(UserNotFoundError);
    });

    it('should throw UserDeletionError when deletion fails', async () => {
      // Arrange
      const userId = 1;
      const existingUser = createMockPrismaUser();

      prismaMock.user.findUnique.mockResolvedValue(prismaUserToDto(existingUser) as any);
      prismaMock.user.delete.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(userService.deleteUser(userId)).rejects.toThrow(UserDeletionError);
    });
  });

  describe('softDeleteUser', () => {
    it('should soft delete user by updating state to DELETED', async () => {
      // Arrange
      const userId = 1;
      const existingUser = createMockPrismaUser();
      const deletedUser = createMockPrismaUser({ state: DataState.DELETED });

      prismaMock.user.findUnique.mockResolvedValueOnce(prismaUserToDto(existingUser) as any);
      prismaMock.user.findUnique.mockResolvedValueOnce(null);
      prismaMock.user.update.mockResolvedValue(prismaUserToDto(deletedUser) as any);

      // Act
      const result = await userService.softDeleteUser(userId);

      // Assert
      expect(result).toEqual(prismaUserToDto(deletedUser));
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { state: DataState.DELETED },
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
    });
  });

  describe('getUsersByState', () => {
    it('should return users filtered by state', async () => {
      // Arrange
      const mockUsers = createMockPrismaUserList(2);
      const state = DataState.ACTIVE;

      prismaMock.user.findMany.mockResolvedValue(mockUsers.map(prismaUserToDto) as any);

      // Act
      const result = await userService.getUsersByState(state);

      // Assert
      expect(result).toEqual(mockUsers.map(prismaUserToDto));
      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
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
    });
  });

  describe('getUserCount', () => {
    it('should return total user count', async () => {
      // Arrange
      const totalCount = 42;
      prismaMock.user.count.mockResolvedValue(totalCount);

      // Act
      const result = await userService.getUserCount();

      // Assert
      expect(result).toBe(totalCount);
      expect(prismaMock.user.count).toHaveBeenCalledWith();
    });
  });

  describe('getUserCountByState', () => {
    it('should return user count filtered by state', async () => {
      // Arrange
      const count = 15;
      const state = DataState.ACTIVE;
      prismaMock.user.count.mockResolvedValue(count);

      // Act
      const result = await userService.getUserCountByState(state);

      // Assert
      expect(result).toBe(count);
      expect(prismaMock.user.count).toHaveBeenCalledWith({
        where: { state },
      });
    });
  });
});
