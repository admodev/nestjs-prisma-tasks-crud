// Modules
import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from "@nestjs/common";
import { Task } from "@prisma/client";

// Services
import { TaskService } from "./task.service";

// Utils
import { idCheck } from "src/utils/FormUtils";

// Constants
import { TASK_NOT_FOUND } from "src/constants/taskConstants";

@Controller('tasks')
export class TaskController {
  // Uso del servicio de tareas
  constructor(private taskService: TaskService) { }

  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Post()
  async createTask(@Body() data: Task) {
    return this.taskService.createTask(data);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    idCheck(id);

    const taskFound = await this.taskService.getTaskById(parseInt(id));

    if (!taskFound) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    return taskFound
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      idCheck(id);

      return await this.taskService.deleteTask(parseInt(id));
    } catch (error) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Task) {
    try {
      idCheck(id);

      return await this.taskService.updateTask(parseInt(id), data);
    } catch (error) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
  }
}
