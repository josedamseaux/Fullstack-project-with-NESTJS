import { DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getHello(): Promise<User[]>;
    getOneUser(id: any): Promise<User>;
    getOnlyOneUser(id: any): Promise<User>;
    getTables(): Promise<any>;
    create(user: User): Promise<User>;
    update(id: any, user: User): Promise<any>;
    delete(id: any): Promise<DeleteResult>;
}
