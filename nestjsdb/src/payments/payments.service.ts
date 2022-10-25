import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PaymentsEntity } from './payments.entity';

import { PaymentsModule } from 'src/payments/payments.module';

@Injectable()
export class PaymentsService {

  constructor(

    @InjectRepository(PaymentsEntity) 

    public payRepository: Repository<PaymentsEntity>,
    // public paymentsRepository: Repository<PaymentsEntity>,
    ) {}

    // JOIN method with payment and user: 
    async getPayment(): Promise<any> {
      const persons = await this.payRepository
      .createQueryBuilder("persons")
      .innerJoin("payments", "pay",  "pay.customerId = Persons.Id" )
      .select("persons.firstName, persons.lastName, pay.payDate, pay.customerId, pay.id")
      .getRawMany()
      return persons;
    }

    async getAll(): Promise<PaymentsEntity[]> {
        return await this.payRepository.find();
      }

    async create(pay: PaymentsEntity): Promise<PaymentsEntity> {
      return await this.payRepository.save(pay);
    }

    async update(user: PaymentsEntity): Promise<UpdateResult> {
      return await this.payRepository.update(user.id, user);
    }
  
    async delete(id): Promise<DeleteResult> {
      return await this.payRepository.delete(id);
    }




}