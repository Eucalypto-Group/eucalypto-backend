import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controllers';
import { UsersService } from './services/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
