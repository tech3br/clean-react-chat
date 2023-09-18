import { RemoteUserListing } from '@/data/usecases/';
import { IUserListing } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '@/main/factories/http';

export const makeRemoteUserListing = (): IUserListing => {
  const remoteUserListing = new RemoteUserListing(
    makeApiUrl('/user'),
    makeAuthorizeHttpClientDecorator()
  );

  return remoteUserListing;
};
