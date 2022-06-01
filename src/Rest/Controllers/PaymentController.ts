import { Request, Response } from 'express';
import { container } from 'tsyringe';
import PaymentService from '../../Core/Services/PaymentService';

export default class PaymentController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;
      const injectService = container.resolve(PaymentService);
      await injectService.createPaymentMethod(body);
      return response.status(201).json();
    } catch (err) {
      return response.status(500).json({ message: err.message });
    }
  }
  async list(_request: Request, response: Response): Promise<Response> {
    try {
      const injectService = container.resolve(PaymentService);
      const listedPayments = await injectService.listPaymentsMethods();
      return response.status(200).json(listedPayments);
    } catch (err) {
      return response.status(500).json({ message: err.message });
    }
  }
}
