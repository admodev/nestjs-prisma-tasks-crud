// Modules
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import * as argon from "argon2";

// Services
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  // Instancia de Prisma
  constructor(private prisma: PrismaService) {}

  async login(id: number): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: {
        id
      }
    })

    console.log(user);

    return user;
  }
}
