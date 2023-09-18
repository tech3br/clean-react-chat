import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import faker from 'faker';
import { Login } from '@/presentation/pages';
import {
  AuthenticationSpy,
  ValidationStub,
  FormHelper,
} from '@/presentation/test/';
import { ApiContext } from '@/presentation/hooks';
import { Authentication } from '@/domain/usecases';

type SutTypes = {
  authenticationSpy: AuthenticationSpy;
  setCurrentAccoutMock: (account: Authentication.Model) => void;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSystemUnderTest = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const setCurrentAccoutMock = jest.fn();

  validationStub.errorMessage = params?.validationError;
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccoutMock }}>
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  );

  return {
    authenticationSpy,
    setCurrentAccoutMock,
  };
};

const simulateValidSubmit = async (
  username = faker.internet.userName(),
  password = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField('username', username);
  FormHelper.populateField('password', password);

  const form = screen.getByTestId('loginForm') as HTMLButtonElement;

  fireEvent.submit(form);

  await waitFor(() => form);
};

describe('Login Component', () => {
  test('Should enable submit button if form is valid', () => {
    makeSystemUnderTest();
    FormHelper.populateField('username');
    FormHelper.populateField('password');
    FormHelper.testButtonIsEnabled('loginButton');
  });

  test('Should show spinner on submit', async () => {
    makeSystemUnderTest();
    await simulateValidSubmit();
    FormHelper.testElementExists('spinner');
  });

  /**
   * The tests below are commented because we are using a permanent token due to test requirements, but everything setted up to work with real authentication
   * I kept the tests to ensure if I have a login endpoint, I should test it, once I developed to support real authentication
   */

  // test('Should call Authentication with correct values', async () => {
  //   const { authenticationSpy } = makeSystemUnderTest();
  //   const username = faker.internet.userName();
  //   const password = faker.internet.password();
  //   await simulateValidSubmit(username, password);

  //   expect(authenticationSpy.params).toEqual({ username, password });
  // });

  // test('Should call Authentication only once', async () => {
  //   const { authenticationSpy } = makeSystemUnderTest();
  //   await simulateValidSubmit();
  //   await simulateValidSubmit();

  //   expect(authenticationSpy.callsCount).toBe(1);
  // });

  // test('Should present error if Authentication fails', async () => {
  //   const { authenticationSpy } = makeSystemUnderTest();
  //   const error = new InvalidCredentialsError();
  //   jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);
  //   await simulateValidSubmit();
  //   FormHelper.testElementText('mainError', error.message);
  //   FormHelper.testChildCount('errorWrap', 1);
  // });

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = makeSystemUnderTest({ validationError });
    await simulateValidSubmit();

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccoutMock } = makeSystemUnderTest(); // authenticationSpy commented because we are using a permanent token due to test requirements, but everything setted up to work with real authentication
    const name = faker.internet.userName();
    const account = {
      accessToken: 'X2gbLGTEBAyOOtT1XlY1BLCLj5BbnfYY',
      name,
      userId: 1,
    };

    await simulateValidSubmit(name);

    expect(setCurrentAccoutMock).toHaveBeenCalledWith(
      account
      //authenticationSpy.account
    );
  });

  test('Should redirect to / after Authentication on success', async () => {
    const { authenticationSpy, setCurrentAccoutMock } = makeSystemUnderTest(); // authenticationSpy commented because we are using a permanent token due to test requirements, but everything setted up to work with real authentication
    const name = faker.internet.userName();
    const account = {
      accessToken: 'X2gbLGTEBAyOOtT1XlY1BLCLj5BbnfYY',
      name,
      userId: 1,
    };

    await simulateValidSubmit(name);

    expect(setCurrentAccoutMock).toHaveBeenCalledWith(
      account
      //authenticationSpy.account
    );
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });
});
