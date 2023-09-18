import { RemoteUserRead } from '@/data/usecases/';
import { IUserRead } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '@/main/factories/http';

export const makeRemoteUserRead = (id: number): IUserRead => {
  const remoteUserRead = new RemoteUserRead(
    makeApiUrl(`/user/${id}`),
    makeAuthorizeHttpClientDecorator()
  );

  return remoteUserRead;
};
