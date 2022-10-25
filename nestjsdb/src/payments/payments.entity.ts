import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('Payments')
export class PaymentsEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @Column()
  payDate: string;

  @Column()
  customerId: number;

  // @ManyToOne(() => User, (persons) => persons.id, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  // })
  //   persons: User

}