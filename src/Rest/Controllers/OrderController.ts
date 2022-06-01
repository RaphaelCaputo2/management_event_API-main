import { ValidateNested } from 'class-validator';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import OrderDTO from '../../Core/DTOs/Order.DTO';
import OrderService from '../../Core/Services/OrderService';
import HttpException from '../../Core/Tools/GlobalError/HttpException';

export default class OrderController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;
      const injectService = container.resolve(OrderService);
      await injectService.validateStock(body);
      await injectService.createOrder(body);
      return response.status(201).json();
    } catch (err) {
      return response.status(500).json({ message: err.message });
    }
  }
  async list(_request: Request, response: Response): Promise<Response> {
    const injectService = container.resolve(OrderService);
    const listedOrders = await injectService.listOrders();
    const orderDtoMapper = OrderDTO.getOrderDTO(listedOrders);
    return response.status(200).json(orderDtoMapper);
  }
}
