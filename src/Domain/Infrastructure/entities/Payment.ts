import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Order from './Order';

@Entity('Payments')
export default class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  method: string;

  @OneToMany(() => Order, (order) => order.payment_method)
  order: Order[];
}
