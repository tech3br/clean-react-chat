import { IHttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors';
import { IUserListing, UserListing } from '@/domain/usecases';

export class RemoteUserListing implements IUserListing {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteUserListingNamespace.Model>
  ) {}

  async list(): Promise<RemoteUserListingNamespace.Model> {
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

export namespace RemoteUserListingNamespace {
  export type Model = UserListing.Model;
}
