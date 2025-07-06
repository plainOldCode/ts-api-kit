import { ServiceRegistry } from './service-registry';
import { UserService } from './user.service';
import { prismaMock, resetMocks } from '../test-utils';

describe('ServiceRegistry', () => {
  let serviceRegistry: ServiceRegistry;

  beforeEach(() => {
    resetMocks();
    serviceRegistry = new ServiceRegistry(prismaMock);
  });

  describe('initialization', () => {
    it('should create UserService instance', () => {
      expect(serviceRegistry.userService).toBeInstanceOf(UserService);
    });

    it('should pass PrismaClient to UserService', () => {
      expect(serviceRegistry.userService).toBeDefined();
      // The UserService constructor receives the PrismaClient
      // We can verify this by checking the service works with our mock
      expect(serviceRegistry.userService['prisma']).toBe(prismaMock);
    });
  });

  describe('service access', () => {
    it('should provide access to userService', () => {
      expect(serviceRegistry.userService).toBeDefined();
      expect(typeof serviceRegistry.userService.getAllUsers).toBe('function');
      expect(typeof serviceRegistry.userService.getUserById).toBe('function');
      expect(typeof serviceRegistry.userService.createUser).toBe('function');
      expect(typeof serviceRegistry.userService.updateUser).toBe('function');
      expect(typeof serviceRegistry.userService.deleteUser).toBe('function');
    });
  });
});
