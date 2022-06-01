import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import Order from '../entities/Order';
import Payment from '../entities/Payment';
import IPaymentRepository from '../interfaceRepository/IPaymentRepository';

export default class PaymentRepository implements IPaymentRepository {
  private ormRepository: Repository<Payment>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Payment);
  }
  async createPaymentMethod(data: Omit<Payment, 'id'>): Promise<Payment> {
    const payment = await this.ormRepository.save(data);

    return payment;
  }
  async listPaymentMethod(): Promise<Payment[]> {
    const paymentList = await this.ormRepository.find();
    return paymentList;
  }
}
