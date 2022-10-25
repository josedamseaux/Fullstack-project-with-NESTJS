import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { PaymentsController } from './payments.controller';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { PaymentsEntity } from './payments.entity';
import { PaymentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, PaymentsEntity])],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}