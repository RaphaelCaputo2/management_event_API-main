import { Request, Response } from 'express';
import { container } from 'tsyringe';
import PaymentService from '../../Core/Services/PaymentService';

export default class PaymentController {
  async create(request: Request, response: Response): Promise<Response> {
    const { body } = request;
    const injectService = container.resolve(PaymentService);
    await injectService.createPaymentMethod(body);
    return response.status(201).json();
  }
  async list(_request: Request, response: Response): Promise<Response> {
    const injectService = container.resolve(PaymentService);
    const listedPayments = await injectService.listPaymentsMethods();
    return response.status(200).json(listedPayments);
  }
}
