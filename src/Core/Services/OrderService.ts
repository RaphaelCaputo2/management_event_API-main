import { inject, injectable } from 'tsyringe';
import Order from '../../Domain/Infrastructure/entities/Order';
import IEventRepository from '../../Domain/Infrastructure/interfaceRepository/IEventRepository';
import IOrderRepository from '../../Domain/Infrastructure/interfaceRepository/IOrderRepository';
import ITicketRepository from '../../Domain/Infrastructure/interfaceRepository/ITicketRepository';
import HttpException from '../Tools/GlobalError/HttpException';

@injectable()
export default class OrderService {
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository,
    @inject('TicketRepository') private ticketRepository: ITicketRepository,
    @inject('EventRepository') private eventRepository: IEventRepository,
  ) {}

  public async createOrder(data: Omit<Order, 'id'>): Promise<Order> {
    const order = await this.orderRepository.create(data);
    return order;
  }
  public async listOrders(): Promise<Order[]> {
    const orderList = await this.orderRepository.list();
    return orderList;
  }
  public async validateStock(order: Order): Promise<Order> {
    const ticketHaveStock = await this.ticketRepository.findById(order.ticket);
    if (ticketHaveStock.event.stock === 0) {
      throw new HttpException(400, 'Event its sold out');
    }
    if (order.quantity > ticketHaveStock.event.stock || order.quantity < 1) {
      throw new HttpException(400, 'Not enough stock');
    }
    await this.eventRepository.findByIdAndUpdateStock(
      ticketHaveStock.event.id,
      order.quantity,
    );
    return order;
  }
}
