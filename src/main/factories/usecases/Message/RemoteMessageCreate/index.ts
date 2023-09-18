import { RemoteCreateMessage } from '@/data/usecases/';
import { ICreateMessage } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '@/main/factories/http';

export const makeRemoteMessageCreate = (
  userId: number,
  conversationId: number
): ICreateMessage => {
  const remoteCreateMessage = new RemoteCreateMessage(
    makeApiUrl(`/user/${userId}/conversation/${conversationId}/message`),
    makeAuthorizeHttpClientDecorator()
  );

  return remoteCreateMessage;
};
