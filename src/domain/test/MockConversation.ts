import faker from 'faker';
import {
  ConversationListing,
  ConversationRead,
  CreateConversation,
} from '../usecases';
import { mockUserModel } from './MockUser';
import { mockMessageModel } from './MockMessage';
import { ConversationModel } from '../models';

export const mockConversationListingModel = (): ConversationListing.Model => ({
  data: [
    mockConversationModel(),
    mockConversationModel(),
    mockConversationModel(),
  ],
  links: {
    first: faker.internet.url(),
    last: faker.internet.url(),
    prev: faker.internet.url(),
    next: faker.internet.url(),
  },
  meta: {
    path: faker.internet.url(),
    per_page: faker.datatype.number(),
  },
});

export const mockConversationModel = (): ConversationModel => ({
  id: faker.datatype.number(),
  name: faker.internet.userName(),
  members: [mockUserModel(), mockUserModel(), mockUserModel()],
  last_message: mockMessageModel(),
});

export const mockConversationReadModel = (): ConversationRead.Model => ({
  data: {
    id: faker.datatype.number(),
    name: faker.internet.userName(),
    members: [mockUserModel(), mockUserModel(), mockUserModel()],
    last_message: mockMessageModel(),
  },
});

export const mockCreateConversation = (): CreateConversation.Params => ({
  user_ids: [
    faker.datatype.number(),
    faker.datatype.number(),
    faker.datatype.number(),
  ],
  name: faker.internet.userName(),
});

export const mockCreateConversationModel = (): CreateConversation.Model => ({
  data: mockConversationModel(),
});
