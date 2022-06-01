import Order from '../../Domain/Infrastructure/entities/Order';
import Payment from '../../Domain/Infrastructure/entities/Payment';
import Ticket from '../../Domain/Infrastructure/entities/Ticket';
import User from '../../Domain/Infrastructure/entities/User';
import IOrderDTO from './Interfaces/IOrderDTO.interface';
import IUserDTO from './Interfaces/IUserDTO.interface';

export default class OrderDTO implements IOrderDTO {
  public static getOrderDTO(order: Order | any): IOrderDTO {
    const mappedOrder = order.map((order: Order) => {
      if (!order?.user?.password) {
        return;
      }
      delete order.user.password;
      return {
        id: order.id,
        user: order.user,
        ticket: order.ticket,
        payment_method: order.payment_method,
      };
    });
    return mappedOrder;
  }
}
