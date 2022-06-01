import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Event from './Event';
import Order from './Order';

@Entity('Tickets')
export default class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Event, (event) => event.tickets)
  event: Event;

  @OneToMany(() => Order, (order) => order.ticket)
  order: Order[];
}
