import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { PaymentsModule } from 'src/payments/payments.module';
import { PaymentsEntity } from 'src/payments/payments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PaymentsEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}