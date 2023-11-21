// Modules
import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";

// Services
import { UserService } from "./user.service";

// Utils
import { idCheck } from "src/utils/FormUtils";

// Constants
import { USER_NOT_FOUND } from "src/constants/userConstants";

@Controller('users')
export class UserController {
  // Uso del servicio de usuarios
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() data: User) {
    return this.userService.createUser(data);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    idCheck(id);

    const userFound = await this.userService.getUserById(parseInt(id));

    if (!userFound) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return userFound
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      idCheck(id);

      return await this.userService.deleteUser(parseInt(id));
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: User) {
    try {
      idCheck(id);

      return await this.userService.updateUser(parseInt(id), data);
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
  }
}
