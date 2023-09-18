import { IHttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors';
import { IConversationRead, ConversationRead } from '@/domain/usecases';

export class RemoteConversationRead implements IConversationRead {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteConversationReadNamespace.Model>
  ) {}

  async read(): Promise<RemoteConversationReadNamespace.Model> {
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

export namespace RemoteConversationReadNamespace {
  export type Model = ConversationRead.Model;
}
