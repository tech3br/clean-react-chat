import {
  RemoteConversationListing,
  RemoteConversationListingNamespace,
} from './RemoteConversationListing';
import { HttpClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http/';
import { mockConversationListingModel } from '@/domain/test/';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/';
import faker from 'faker';

type SutTypes = {
  systemUnderTest: RemoteConversationListing;
  httpClientSpy: HttpClientSpy<RemoteConversationListingNamespace.Model>;
};

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy =
    new HttpClientSpy<RemoteConversationListingNamespace.Model>();
  const systemUnderTest = new RemoteConversationListing(url, httpClientSpy);

  return {
    systemUnderTest,
    httpClientSpy,
  };
};

describe('RemoteConversationListing', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest(url);
    await systemUnderTest.list();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  test('Should return an ConversationListing.Model if HttpPostClient returns 200', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    const httpResult = mockConversationListingModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const Conversation = await systemUnderTest.list();
    expect(Conversation).toEqual(httpResult);
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
