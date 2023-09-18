import { MessageModel } from '@/domain/models';

export interface ICreateMessage {
  create: (params: CreateMessage.Params) => Promise<CreateMessage.Model>;
}

export namespace CreateMessage {
  export type Params = {
    text: string;
  };

  export type Model = {
    data: MessageModel;
  };
}
