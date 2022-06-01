import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Payment from './Payment';
import Ticket from './Ticket';
import User from './User';

@Entity('Orders')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.order)
  ticket: Ticket;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Payment, (payment) => payment.method)
  payment_method: Payment;
}
