import { IHttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors';
import { ICreateMessage, CreateMessage } from '@/domain/usecases';

export class RemoteCreateMessage implements ICreateMessage {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteCreateMessageNamespace.Model>
  ) {}

  async create(
    params: CreateMessage.Params
  ): Promise<RemoteCreateMessageNamespace.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteCreateMessageNamespace {
  export type Model = CreateMessage.Model;
}
