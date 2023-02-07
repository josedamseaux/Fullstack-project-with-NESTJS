"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const payments_entity_1 = require("../payments/payments.entity");
const payments_module_1 = require("../payments/payments.module");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getPayment() {
        const persons = await this.usersRepository
            .createQueryBuilder("persons")
            .innerJoin("payments", "pay", "pay.customerId = Persons.Id")
            .select("persons.firstName, persons.lastName, pay.payDate, pay.customerId, pay.id")
            .getRawMany();
        return persons;
    }
    async getAll() {
        return await this.usersRepository.find();
    }
    async getOneUser(id) {
        return await this.usersRepository.findOneBy({ id });
    }
    async create(user) {
        return await this.usersRepository.save(user);
    }
    async update(user) {
        return await this.usersRepository.update(user.id, user);
    }
    async delete(id) {
        return await this.usersRepository.delete(id);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(0, (0, typeorm_1.InjectRepository)(payments_entity_1.PaymentsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map