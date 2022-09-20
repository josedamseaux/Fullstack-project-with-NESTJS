import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { PaymentsEntity } from '../payments/payments.entity';

@Entity('Persons')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dni: number;  

  @Column()
  startDate: string;  

  @Column()
  affiliateType: string;  

  @Column()
  phoneNumber: string;  

  @Column()
  emailAdress: string;  

  // @OneToMany(type => PaymentsEntity, payments => payments.customerId)
  // payments: PaymentsEntity; 

  @OneToMany(() => PaymentsEntity, (payments) => payments.customerId)
  payments: PaymentsEntity

}

