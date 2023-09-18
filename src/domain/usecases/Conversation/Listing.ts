import { ConversationModel } from '@/domain/models/';

export interface IConversationListing {
  list(): Promise<ConversationListing.Model>;
}

export namespace ConversationListing {
  export type Model = {
    data: Array<ConversationModel>;
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
