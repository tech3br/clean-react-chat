import { UserModel } from '@/domain/models/';

export interface IUserRead {
  read(): Promise<UserRead.Model>;
}

export namespace UserRead {
  export type Model = {
    data: UserModel;
  };
}
