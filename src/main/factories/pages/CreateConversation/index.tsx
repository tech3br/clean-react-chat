import React, { useCallback } from 'react';
import {
  makeRemoteConversationCreate,
  makeRemoteUserListing,
} from '../../usecases';
import { CreateConversation } from '@/presentation/pages';
import { makeCreateConversationValidation } from './CreateConversationValidation';

const makeCreateConversation: React.FC = () => {
  const makeConversationCreate = useCallback(makeRemoteConversationCreate, []);
  const validationComposite = makeCreateConversationValidation();

  return (
    <CreateConversation
      createConversation={makeConversationCreate}
      listOfUsers={makeRemoteUserListing()}
      validation={validationComposite}
    />
  );
};

export default makeCreateConversation;
