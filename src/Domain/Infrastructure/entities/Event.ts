import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Ticket from './Ticket';
import { Length } from 'class-validator';

@Entity('Event')
export default class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  locale: string;

  @Column()
  stock: number;

  @Column()
  price: number;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];
}
