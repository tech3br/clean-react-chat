import { MessageModel } from '@/domain/models/';

export interface IMessageListing {
  list(): Promise<MessageListing.Model>;
}

export namespace MessageListing {
  export type Model = {
    data: Array<MessageModel>;
    links: {
      first: string;
      last: string;
      prev: string;
      next: string;
    };
    meta: {
      path: string;
      per_page: number;
    };
  };
}
