import { RemoteConversationListing } from '@/data/usecases/';
import { IConversationListing } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '@/main/factories/http';

export const makeRemoteConversationListing = (id: number): IConversationListing => {
  const remoteConversationListing = new RemoteConversationListing(
    makeApiUrl(`/user/${id}/conversation`),
    makeAuthorizeHttpClientDecorator()
  );

  return remoteConversationListing;
};
