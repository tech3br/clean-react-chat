import {
  RemoteUserRead,
  RemoteUserReadNamespace,
} from './RemoteUserRead';
import { HttpClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http/';
import { mockUserReadModel } from '@/domain/test/';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/';
import faker from 'faker';

type SutTypes = {
  systemUnderTest: RemoteUserRead;
  httpClientSpy: HttpClientSpy<RemoteUserReadNamespace.Model>;
};

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteUserReadNamespace.Model>();
  const systemUnderTest = new RemoteUserRead(url, httpClientSpy);

  return {
    systemUnderTest,
    httpClientSpy,
  };
};

describe('RemoteUserRead', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest(url);
    await systemUnderTest.read();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  test('Should return an UserRead.Model if HttpPostClient returns 200', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    const httpResult = mockUserReadModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const user = await systemUnderTest.read();
    expect(user).toEqual(httpResult);
  });

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = systemUnderTest.read();

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = systemUnderTest.read();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = systemUnderTest.read();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = systemUnderTest.read();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
