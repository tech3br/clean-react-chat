import { IHttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors';
import { ICreateConversation, CreateConversation } from '@/domain/usecases';

export class RemoteCreateConversation implements ICreateConversation {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteCreateConversationNamespace.Model>
  ) {}

  async create(
    params: CreateConversation.Params
  ): Promise<RemoteCreateConversationNamespace.Model> {
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

export namespace RemoteCreateConversationNamespace {
  export type Model = CreateConversation.Model;
}
