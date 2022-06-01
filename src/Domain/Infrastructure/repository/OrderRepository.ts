import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import Order from '../entities/Order';
import Payment from '../entities/Payment';
import Ticket from '../entities/Ticket';
import User from '../entities/User';
import IOrderRepository from '../interfaceRepository/IOrderRepository';

export default class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Order);
  }

  async create(data: Omit<Order, 'id'>): Promise<Order> {
    const order = await this.ormRepository.save(data);
    return order;
  }
  async list(): Promise<Order[]> {
    const orderList = await this.ormRepository.find({
      relations: ['ticket.event', 'user', 'payment_method'],
    });
    return orderList;
  }
}
