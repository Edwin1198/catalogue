import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsertEntity } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsertEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
