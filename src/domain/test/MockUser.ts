import faker from 'faker';
import { UserModel } from '../models';
import { UserListing, UserRead } from '../usecases';

export const mockUserModel = (): UserModel => ({
  id: faker.datatype.number(),
  name: faker.internet.userName(),
  last_seen_at: faker.date.past().toISOString(),
});

export const mockUserListingModel = (): UserListing.Model => ({
  data: [mockUserModel(), mockUserModel(), mockUserModel()],
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

export const mockUserReadModel = (): UserRead.Model => ({
  data: mockUserModel(),
});
