import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { ApiContext, FormContext } from '@/presentation/hooks';
import { IAuthentication } from '@/domain/usecases';
import { IValidation } from '@/presentation/protocols/validation';

import { Button, Input, FormLoaderStatus } from '@/presentation/components/';
import Styles from './styles.scss';

type LoginProps = {
  validation: IValidation;
  authentication: IAuthentication;
};

const Login: React.FC<LoginProps> = ({
  validation,
  authentication,
}: LoginProps) => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    const { username, password } = state;
    const formData = { username, password };
    const usernameError = validation.validate('username', formData);
    const passwordError = validation.validate('password', formData);

    setState({
      ...state,
      usernameError,
      passwordError,
      isFormInvalid: !!usernameError || !!passwordError,
    });
  }, [state.username, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState({ ...state, isLoading: true });

      // If we have a login auth route, we would request using the code below and use the return to store in cache in setCurrentAccount (line 60)
      // const account = await authentication.auth({
      //   username: state.username,
      //   password: state.password,
      // });
      const account = {
        accessToken: 'X2gbLGTEBAyOOtT1XlY1BLCLj5BbnfYY',
        name: state.username,
        userId: 1 // Since a login route to obtain the current user ID was not provided (to store in the local storage to use here) by the recruiting team, it is hard-coded
      };
      setCurrentAccount(account);
      history.replace('/');
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message,
      });
    }
  };

  return (
    <div className={Styles.login}>
      <div className={Styles.content}>
        <FormContext.Provider value={{ state, setState }}>
          <form
            data-testid="loginForm"
            className={Styles.form}
            onSubmit={handleSubmit}
          >
            <h1 className={Styles.loginTitle}>Login with your account</h1>

            <Input
              autoComplete="off"
              title="Enter your username"
              type="username"
              name="username"
              data-testid="usernameField"
            />

            <Input
              autoComplete="off"
              title="Enter your password"
              type="password"
              name="password"
              data-testid="passwordField"
              minLength={4}
            />
            <div className={Styles.buttonsContainer}>
              <Button
                className={Styles.loginBtn}
                type="submit"
                disabled={state.isFormInvalid}
                title="Login"
                data-testid="loginButton"
              />
            </div>
            <FormLoaderStatus />
          </form>
        </FormContext.Provider>
      </div>
    </div>
  );
};

export default Login;
