interface IEventResponse {
  id?: string;
  name: string;
  locale: string;
  stock: number;
  price: number;
  // tickets?: ITicketResponse[];
}
export interface IEventResponses extends Array<IEventResponse> {}
