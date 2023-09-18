import React, { useCallback } from 'react';
import { Chat } from '@/presentation/pages';
import {
  makeRemoteConversationRead,
  makeRemoteMessageCreate,
  makeRemoteMessageListing,
} from '../../usecases';

const makeChat: React.FC = () => {
  const makeMessageListing = useCallback(makeRemoteMessageListing, []);
  const makeMessageCreate = useCallback(makeRemoteMessageCreate, []);
  const makeConversationRead = useCallback(makeRemoteConversationRead, []);

  return (
    <Chat
      createMessage={makeMessageCreate}
      listOfMessages={makeMessageListing}
      conversationDetails={makeConversationRead}
    />
  );
};

export default makeChat;
