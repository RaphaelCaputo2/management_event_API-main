import Ticket from '../entities/Ticket';

export default interface ITicketRepository {
  listTickets(): Promise<Ticket[]>;
  findById(data: Omit<Ticket, 'id'>): Promise<Ticket>;
  updateStock(id: string, quantity: any): Promise<Ticket>;
}
