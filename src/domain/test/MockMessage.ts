import faker from 'faker';
import { MessageListing, CreateMessage } from '../usecases';
import { MessageModel } from '../models';

export const mockMessageModel = (): MessageModel => ({
  id: faker.datatype.number(),
  user_id: faker.datatype.number(),
  text: faker.lorem.lines(),
  sent_at: faker.date.past().toISOString(),
});
export const mockMessageListingModel = (): MessageListing.Model => ({
  data: [mockMessageModel(), mockMessageModel(), mockMessageModel()],
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

export const mockCreateMessage = (): CreateMessage.Params => ({
  text: faker.lorem.lines(),
});

export const mockCreateMessageModel = (): CreateMessage.Model => ({
  data: mockMessageModel(),
});
