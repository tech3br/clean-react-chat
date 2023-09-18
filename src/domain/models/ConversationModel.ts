import { MessageModel } from './MessageModel';
import { UserModel } from './UserModel';

export type ConversationModel = {
  id: number;
  name: string;
  members: Array<UserModel>;
  last_message: MessageModel;
};
