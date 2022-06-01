import { inject, injectable } from 'tsyringe';
import Payment from '../../Domain/Infrastructure/entities/Payment';
import IPaymentRepository from '../../Domain/Infrastructure/interfaceRepository/IPaymentRepository';

@injectable()
export default class PaymentService {
  constructor(
    @inject('PaymentRepository') private paymentRepository: IPaymentRepository,
  ) {}

  public async createPaymentMethod(data: Omit<Payment, 'id'>): Promise<Payment> {
    const payment = await this.paymentRepository.createPaymentMethod(data);
    return payment;
  }
  public async listPaymentsMethods(): Promise<Payment[]> {
    const listPayments = await this.paymentRepository.listPaymentMethod();
    return listPayments;
  }
}
