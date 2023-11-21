// Modules
import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";

// Services
import { AuthService } from "./auth.service";

// Constants
import { USER_NOT_FOUND } from "src/constants/userConstants";
import { UserService } from "src/user/user.service";

@Controller('auth')
export class AuthController {
  private userService: UserService
  // Uso del servicio de autenticacion
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() data: { email: string, password: string }) {
    const userFound = await this.userService.getUserByEmail(data.email);

    if (!userFound) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const loggedUserIn = await this.authService.login(userFound.id);

    return loggedUserIn;
  }
}
