import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import Order from '../entities/Order';
import Payment from '../entities/Payment';
import Ticket from '../entities/Ticket';
import IPaymentRepository from '../interfaceRepository/IPaymentRepository';
import ITicketRepository from '../interfaceRepository/ITicketRepository';

export default class TicketRepository implements ITicketRepository {
  private ormRepository: Repository<Ticket>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Ticket);
  }
  async listTickets(): Promise<Ticket[]> {
    const ticketList = await this.ormRepository.find();
    return ticketList;
  }
  async findById(data: Omit<Ticket, 'id'>): Promise<Ticket> {
    const ticket = await this.ormRepository.findOne({
      where: { id: String(data) },
      relations: ['event'],
    });
    return ticket;
  }
  async updateStock(id: string, quantity: any): Promise<Ticket> {
    const ticketEvent = await this.ormRepository.findOne({
      where: { id: String(id) },
      relations: ['event'],
    });
    Number(ticketEvent.event.stock) - Number(quantity);
    const ticket = await this.ormRepository.save(ticketEvent);
    return ticket;
  }
}
