import { PrismaClient } from '@prisma/client';
import { UserService } from './user.service';

export class ServiceRegistry {
  public readonly userService: UserService;

  constructor(private readonly prisma: PrismaClient) {
    this.userService = new UserService(this.prisma);
  }
}

export interface ServiceContainer {
  userService: UserService;
}
