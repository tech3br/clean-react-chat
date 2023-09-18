import {
  RemoteUserListing,
  RemoteUserListingNamespace,
} from './RemoteUserListing';
import { HttpClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http/';
import { mockUserListingModel } from '@/domain/test/';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/';
import faker from 'faker';

type SutTypes = {
  systemUnderTest: RemoteUserListing;
  httpClientSpy: HttpClientSpy<RemoteUserListingNamespace.Model>;
};

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteUserListingNamespace.Model>();
  const systemUnderTest = new RemoteUserListing(url, httpClientSpy);

  return {
    systemUnderTest,
    httpClientSpy,
  };
};

describe('RemoteUserListing', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest(url);
    await systemUnderTest.list();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  test('Should return an UserListing.Model if HttpPostClient returns 200', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    const httpResult = mockUserListingModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const user = await systemUnderTest.list();
    expect(user).toEqual(httpResult);
  });

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = systemUnderTest.list();

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = systemUnderTest.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = systemUnderTest.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = systemUnderTest.list();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
