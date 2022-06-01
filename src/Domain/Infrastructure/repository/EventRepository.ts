import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import Event from '../entities/Event';
import Ticket from '../entities/Ticket';
import IEventRepository from '../interfaceRepository/IEventRepository';

export default class EventRepository implements IEventRepository {
  private ormRepository: Repository<Event>;
  private ticketRepository: Repository<Ticket>;
  constructor() {
    this.ormRepository = AppDataSource.getRepository(Event);
    this.ticketRepository = AppDataSource.getRepository(Ticket);
  }

  public async createEvent(data: Omit<Event, 'id'>): Promise<Event> {
    const event = await this.ormRepository.save(data);
    const newTicket = new Ticket();
    newTicket.event = event;
    this.ticketRepository.save(newTicket);
    return event;
  }

  public async listEvents(): Promise<Event[]> {
    const eventList = await this.ormRepository.find();
    return eventList;
  }
  public async findByIdAndUpdateStock(id: String, quantity: any): Promise<Event> {
    const event = await this.ormRepository.findOne({
      where: { id: String(id) },
    });
    const newStock = Number(event.stock) - Number(quantity);
    await this.ormRepository.update(String(id), { stock: newStock });
    return event;
  }
}
