import { ConversationModel } from '@/domain/models/';

export interface IConversationRead {
  read(): Promise<ConversationRead.Model>;
}

export namespace ConversationRead {
  export type Model = {
    data: ConversationModel
  };
}
