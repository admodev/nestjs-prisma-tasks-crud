// Modules
import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TaskModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
