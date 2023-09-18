import { IHttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors';
import { IMessageListing, MessageListing } from '@/domain/usecases';

export class RemoteMessageListing implements IMessageListing {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteMessageListingNamespace.Model>
  ) {}

  async list(): Promise<RemoteMessageListingNamespace.Model> {
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

export namespace RemoteMessageListingNamespace {
  export type Model = MessageListing.Model;
}
