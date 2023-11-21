// Modules
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";

// Controllers
import { UserController } from "./user.controller";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule]
})
export class UserModule {}
