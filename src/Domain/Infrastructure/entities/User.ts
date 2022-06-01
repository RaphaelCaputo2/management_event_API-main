import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Order from './Order';

@Entity('Users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
