import { RemoteConversationRead } from '@/data/usecases/';
import { IConversationRead } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '@/main/factories/http';

export const makeRemoteConversationRead = (
  userId: number,
  conversationId: number
): IConversationRead => {
  const remoteConversationRead = new RemoteConversationRead(
    makeApiUrl(`/user/${userId}/conversation/${conversationId}`),
    makeAuthorizeHttpClientDecorator()
  );

  return remoteConversationRead;
};
