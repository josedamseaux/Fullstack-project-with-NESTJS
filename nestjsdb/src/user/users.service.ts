import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { PaymentsEntity } from '../payments/payments.entity';

import { PaymentsModule } from 'src/payments/payments.module';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 

    @InjectRepository(PaymentsEntity) 

    public usersRepository: Repository<User>,
    // public paymentsRepository: Repository<PaymentsEntity>,
    ) {}

    // JOIN method with payment and user: 
    async getPayment(): Promise<any> {
      const persons = await this.usersRepository
      .createQueryBuilder("persons")
      .innerJoin("payments", "pay",  "pay.customerId = Persons.Id" )
      .select("persons.firstName, persons.lastName, pay.payDate, pay.customerId, pay.id")
      .getRawMany()
      return persons;
    }

    async getAll(): Promise<User[]> {
      return await this.usersRepository.find();
    }

    async getOneUser(id): Promise<User> {
      return await this.usersRepository.findOneBy({id});
    }

    async create(user: User): Promise<User> {
      return await this.usersRepository.save(user);
    }

    async update(user: User): Promise<UpdateResult> {
      return await this.usersRepository.update(user.id, user);
    }
  
    async delete(id): Promise<DeleteResult> {
      return await this.usersRepository.delete(id);
    }

    // async deleteConstraint(): Promise<any> {
    //   const deletee = await this.usersRepository
    //   .createQueryBuilder("delete")
    //   .delete()
    //   .from(PaymentsEntity)
    //   .where("pay.customerId = Persons.Id")
    //   // .select("persons.firstName, persons.lastName, pay.payDate, pay.customerId, pay.id")
    //   .execute()
    //   return deletee;
    // }


}