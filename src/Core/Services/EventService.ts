import { inject, injectable } from 'tsyringe';
import Event from '../../Domain/Infrastructure/entities/Event';
import IEventRepository from '../../Domain/Infrastructure/interfaceRepository/IEventRepository';

@injectable()
export default class EventService {
  constructor(@inject('EventRepository') private eventRepository: IEventRepository) {}

  public async create(data: Omit<Event, 'id'>): Promise<Event> {
    const event = await this.eventRepository.createEvent(data);
    return event;
  }

  public async list(): Promise<Event[]> {
    const eventList = await this.eventRepository.listEvents();
    return eventList;
  }
}
