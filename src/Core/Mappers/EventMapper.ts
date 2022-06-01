import Event from '../../Domain/Infrastructure/entities/Event';
import { IEventResponses } from './Interfaces/IEventResponse';

export default class EventMapper {
  constructor() {
    console.log('EventMapper');
  }
  public async mapEventToEventDto(event: IEventResponses): Promise<IEventResponses> {
    const eventMapper = event.map((e) => {
      return {
        name: e.name,
        locale: e.locale,
        stock: e.stock,
        price: e.price,
      };
    });
    return eventMapper;
  }
}
