import { container } from 'tsyringe';

import IEventRepository from '../../Domain/Infrastructure/interfaceRepository/IEventRepository';
import IOrderRepository from '../../Domain/Infrastructure/interfaceRepository/IOrderRepository';
import IPaymentRepository from '../../Domain/Infrastructure/interfaceRepository/IPaymentRepository';
import ITicketRepository from '../../Domain/Infrastructure/interfaceRepository/ITicketRepository';

import IUserRepository from '../../Domain/Infrastructure/interfaceRepository/IUserRepository';
import EventRepository from '../../Domain/Infrastructure/repository/EventRepository';
import OrderRepository from '../../Domain/Infrastructure/repository/OrderRepository';
import PaymentRepository from '../../Domain/Infrastructure/repository/PaymentRepository';
import TicketRepository from '../../Domain/Infrastructure/repository/TicketRepository';
import UserRepository from '../../Domain/Infrastructure/repository/UserRepository';

container.registerSingleton<IEventRepository>('EventRepository', EventRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IPaymentRepository>('PaymentRepository', PaymentRepository);
container.registerSingleton<IOrderRepository>('OrderRepository', OrderRepository);
container.registerSingleton<ITicketRepository>('TicketRepository', TicketRepository);
