import { IHttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors';
import { IUserRead, UserRead } from '@/domain/usecases';

export class RemoteUserRead implements IUserRead {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteUserReadNamespace.Model>
  ) {}

  async read(): Promise<RemoteUserReadNamespace.Model> {
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

export namespace RemoteUserReadNamespace {
  export type Model = UserRead.Model;
}
