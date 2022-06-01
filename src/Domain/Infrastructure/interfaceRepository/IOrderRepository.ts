import Order from '../entities/Order';

export default interface IOrderRepository {
  create(data: Omit<Order, 'id'>): Promise<Order>;
  list(): Promise<Order[]>;
}
