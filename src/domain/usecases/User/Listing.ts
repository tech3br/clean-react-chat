import { UserModel } from '@/domain/models/';

export interface IUserListing {
  list(): Promise<UserListing.Model>;
}

export namespace UserListing {
  export type Model = {
    data: Array<UserModel>;
    links: {
      first?: string;
      last?: string;
      prev?: string;
      next?: string;
    };
    meta: {
      path: string;
      per_page: number;
    };
  };
}
