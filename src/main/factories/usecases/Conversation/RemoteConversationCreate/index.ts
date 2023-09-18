import { RemoteCreateConversation } from '@/data/usecases';
import { ICreateConversation } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '@/main/factories/http';

export const makeRemoteConversationCreate = (
  id: number
): ICreateConversation => {
  const remoteConversationCreate = new RemoteCreateConversation(
    makeApiUrl(`/user/${id}/conversation`),
    makeAuthorizeHttpClientDecorator()
  );

  return remoteConversationCreate;
};
