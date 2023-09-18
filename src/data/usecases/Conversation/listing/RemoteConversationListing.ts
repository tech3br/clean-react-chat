import { IHttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors';
import { IConversationListing, ConversationListing } from '@/domain/usecases';

export class RemoteConversationListing implements IConversationListing {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteConversationListingNamespace.Model>
  ) {}

  async list(): Promise<RemoteConversationListingNamespace.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteConversationListingNamespace {
  export type Model = ConversationListing.Model;
}
