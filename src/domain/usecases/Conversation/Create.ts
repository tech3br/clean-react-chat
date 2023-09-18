import { ConversationModel } from '@/domain/models';

export interface ICreateConversation {
  create: (
    params: CreateConversation.Params
  ) => Promise<CreateConversation.Model>;
}

export namespace CreateConversation {
  export type Params = {
    user_ids: Array<number>;
    name?: string;
  };

  export type Model = {
    data: ConversationModel;
  };
}
