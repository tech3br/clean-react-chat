import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { makeLogin, makeDashboard, makeCreateConversation, makeChat } from '@/main/factories/pages';
import PrivateRoute from '@/presentation/Routes/private.routes';
import { ApiContext } from '@/presentation/hooks';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/CurrentAccountAdapter';

import '@/presentation/styles/global.scss';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={makeLogin} />
          <PrivateRoute exact path="/" component={makeDashboard} />
          <PrivateRoute exact path="/new-conversation" component={makeCreateConversation} />
          <PrivateRoute exact path="/chat/:id" component={makeChat} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
