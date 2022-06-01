import { Request, Response } from 'express';
import { container } from 'tsyringe';
import EventService from '../../Core/Services/EventService';

interface IEventDTO {
  id?: string;
  name: string;
  locale: string;
  stock: number;
  price: number;
}

export default class EventController {
  async create(request: Request, response: Response): Promise<Response> {
    const { body } = request;
    const eventService = container.resolve(EventService);
    const dtoEvent: IEventDTO = await eventService.create(body);
    return response.status(201).json(dtoEvent);
  }
  async listEvents(
    _request: Request,
    response: Response,
  ): Promise<Response<IEventDTO[]>> {
    const eventService = container.resolve(EventService);
    const eventList = await eventService.list();
    const eventDTO = eventList.map((event) => ({
      name: event.name,
      locale: event.locale,
      stock: event.stock,
      price: event.price,
    }));
    return response.status(200).json(eventDTO);
  }
  async findByName(request: Request, response: Response): Promise<Response<IEventDTO>> {
    try {
      const { name } = request.body;
      const eventService = container.resolve(EventService);
      const event = await eventService.findByName(name.toLowerCase());
      if (!event) {
        return response.status(404).json({ message: 'Event not found' });
      }
      return response.status(200).json(event);
    } catch (err) {
      return response.status(404).json({ message: 'Event not found' });
    }
  }
}
