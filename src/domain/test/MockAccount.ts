import faker from 'faker';
import { AccountModel } from '../models';

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.internet.userName(),
  userId: faker.datatype.number(),
});
