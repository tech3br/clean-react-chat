import { RemoteMessageListing } from '@/data/usecases/';
import { IMessageListing } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '@/main/factories/http';

export const makeRemoteMessageListing = (
  userId: number,
  conversationId: number
): IMessageListing => {
  const remoteMessageListing = new RemoteMessageListing(
    makeApiUrl(`/user/${userId}/conversation/${conversationId}/message`),
    makeAuthorizeHttpClientDecorator()
  );

  return remoteMessageListing;
};
