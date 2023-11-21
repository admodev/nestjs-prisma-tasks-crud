// Modules
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import * as argon from "argon2";

// Services
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  // Instancia de Prisma
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async getUserByEmail(email_address: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email: email_address
      }
    })
  }

  async createUser(data: User): Promise<User> {
    // Password hashing before creation.
    const hash = await argon.hash(data.password);

    if (hash && hash.length > 0) {
      data.password = hash;
    }

    return this.prisma.user.create({
      data
    })
  }

  async updateUser(id: number, data: User): Promise<User> {
    return this.prisma.user.update({
      where: {
        id
      },
      data
    })
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
