import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    usersRepository: Repository<User>;
    constructor(usersRepository: Repository<User>);
    getPayment(): Promise<any>;
    getAll(): Promise<User[]>;
    getOneUser(id: any): Promise<User>;
    create(user: User): Promise<User>;
    update(user: User): Promise<UpdateResult>;
    delete(id: any): Promise<DeleteResult>;
}
