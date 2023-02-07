import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PaymentsEntity } from './payments.entity';
export declare class PaymentsService {
    payRepository: Repository<PaymentsEntity>;
    constructor(payRepository: Repository<PaymentsEntity>);
    getPayment(): Promise<any>;
    getAll(): Promise<PaymentsEntity[]>;
    create(pay: PaymentsEntity): Promise<PaymentsEntity>;
    update(user: PaymentsEntity): Promise<UpdateResult>;
    delete(id: any): Promise<DeleteResult>;
}
