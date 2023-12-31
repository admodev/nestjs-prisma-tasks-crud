// Modules
import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";

// Controllers
import { AuthController } from "./auth.controller";

// Services
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule]
})
export class AuthModule {}
