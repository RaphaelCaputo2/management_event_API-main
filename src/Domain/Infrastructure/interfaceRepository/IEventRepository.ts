import Event from '../entities/Event';

export default interface IEventRepository {
  createEvent(data: Omit<Event, 'id'>): Promise<Event>;
  listEvents(): Promise<Event[]>;
  findByIdAndUpdateStock(id: String, quantity: any): Promise<Event>;
  findEventByName(name: string): Promise<Event>;
}
