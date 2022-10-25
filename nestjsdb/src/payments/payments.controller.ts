import { Controller, Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PaymentsEntity } from './payments.entity';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly payService: PaymentsService) {}

  @Get('/getpayments')
  getHello(): Promise<PaymentsEntity[]> {
    return this.payService.getAll();
  }

//   @Get('users')

//   async getOneUser(@Param('id') id): Promise<User> {
//     return this.usersService.getOneUser(id);
//   }
  
//   @Get('users/:id')
//   async getOnlyOneUser(@Param('id') id): Promise<User> {
//     return this.usersService.getOneUser(id);
//   }

//   @Get('joined')
//   getTables(): Promise<any> {
//     return this.usersService.getPayment();
//   }

  @Post('/createpayment')
  async create(@Body() pay: PaymentsEntity): Promise<PaymentsEntity> {
    return this.payService.create(pay);
  }  
  
//   @Put('users/update/:id')
//   async update(@Param('id') id, @Body() user: User): Promise<any> {
//     user.id = Number(id);
//     this.usersService.delete(user);
//     return this.usersService.create(user)
//   }  
  
//   @Delete('users/delete/:id') 
//   async delete(@Param('id') id): Promise<DeleteResult> {
//     return this.usersService.delete(id);
//   }

}
