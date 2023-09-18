import {
  RemoteCreateConversation,
  RemoteCreateConversationNamespace,
} from './RemoteConversationCreate';
import { HttpClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http/';
import { mockCreateConversationModel, mockCreateConversation } from '@/domain/test/';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/';
import faker from 'faker';

type SutTypes = {
  systemUnderTest: RemoteCreateConversation;
  httpClientSpy: HttpClientSpy<RemoteCreateConversationNamespace.Model>;
};

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteCreateConversationNamespace.Model>();
  const systemUnderTest = new RemoteCreateConversation(url, httpClientSpy);

  return {
    systemUnderTest,
    httpClientSpy,
  };
};

describe('RemoteCreateConversation', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest(url);
    const createConversationParams = mockCreateConversation();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.created,
    };
    await systemUnderTest.create(createConversationParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
    expect(httpClientSpy.body).toEqual(createConversationParams);
  });

  test('Should create a conversation if HttpPostClient returns 201', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    const httpResult = mockCreateConversationModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.created,
      body: httpResult,
    };
    const account = await systemUnderTest.create(mockCreateConversation());

    expect(account).toEqual(httpResult);
  });

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = systemUnderTest.create(mockCreateConversation());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = systemUnderTest.create(mockCreateConversation());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = systemUnderTest.create(mockCreateConversation());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = systemUnderTest.create(mockCreateConversation());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
