import { Controller, Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  getHello(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get('users')
  async getOneUser(@Param('id') id): Promise<User> {
    return this.usersService.getOneUser(id);
  }
  
  @Get('users/:id')
  async getOnlyOneUser(@Param('id') id): Promise<User> {
    return this.usersService.getOneUser(id);
  }

  @Get('joined')
  getTables(): Promise<any> {
    return this.usersService.getPayment();
  }

  @Post('users/create')
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }  
  
  // Regular update method, but does not work with identity tables
  // @Put('/update/:id')
  // async update(@Param('id') id, @Body() user: User): Promise<UpdateResult> {
  //   user.id = Number(id);
  //   return this.usersService.update(user);
  // }

  // Update method that works with identity tables, basically 'updates' user by
  // deleting and creating new user by removing column, working for identity tables
  @Put('users/update/:id')
  async update(@Param('id') id, @Body() user: User): Promise<any> {
    user.id = Number(id);
    this.usersService.delete(user);
    return this.usersService.create(user)
  }  
  
  @Delete('users/delete/:id') 
  async delete(@Param('id') id): Promise<DeleteResult> {
    return this.usersService.delete(id);
  }

  // @Delete('users/deleteConstraint') 
  // async deleteConstraint(): Promise<DeleteResult> {
  //   return this.usersService.deleteConstraint();
  // }

}
