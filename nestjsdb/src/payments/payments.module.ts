import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { PaymentsEntity } from './payments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentsEntity]), TypeOrmModule.forFeature([User])],
//   providers: [UsersService],
//   controllers: [UsersController],
})
export class PaymentsModule {}