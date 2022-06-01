import Payment from '../../../Domain/Infrastructure/entities/Payment';
import Ticket from '../../../Domain/Infrastructure/entities/Ticket';
import User from '../../../Domain/Infrastructure/entities/User';
import Order from '../../../Domain/Infrastructure/entities/Order';

import IUserDTO from './IUserDTO.interface';

export default interface IOrderDTO {
  order?: Order[];
}
