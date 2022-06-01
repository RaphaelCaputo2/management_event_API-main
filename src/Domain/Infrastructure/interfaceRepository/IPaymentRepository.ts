import Payment from '../entities/Payment';

export default interface IPaymentRepository {
  createPaymentMethod(data: Omit<Payment, 'id'>): Promise<Payment>;
  listPaymentMethod(): Promise<Payment[]>;
}
