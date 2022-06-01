import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import Event from './Domain/Infrastructure/entities/Event';
import Order from './Domain/Infrastructure/entities/Order';
import Payment from './Domain/Infrastructure/entities/Payment';
import Ticket from './Domain/Infrastructure/entities/Ticket';
import User from './Domain/Infrastructure/entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: false,
  entities: [Event, Order, Payment, Ticket, User],
  migrations: ['src/Domain/Infrastructure/migrations/*.ts'],
  subscribers: [],
});
// test PR
