import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ApiContext } from '@/presentation/hooks';
import { ConversationModel, MessageModel } from '@/domain/models';
import {
  IMessageListing,
  ICreateMessage,
  IConversationRead,
} from '@/domain/usecases';

import { Template, Spinner, ChatComponent } from '@/presentation/components';

type ParamsProps = {
  id: string;
};

type ChatProps = {
  createMessage: (userId: number, conversationId: number) => ICreateMessage;
  listOfMessages: (userId: number, conversationId: number) => IMessageListing;
  conversationDetails: (
    userId: number,
    conversationId: number
  ) => IConversationRead;
};

const Chat: React.FC<ChatProps> = ({
  conversationDetails,
  createMessage,
  listOfMessages,
}) => {
  const { id } = useParams<ParamsProps>();
  const { getCurrentAccount } = useContext(ApiContext);
  const currentUserId = getCurrentAccount().userId;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [conversationInfo, setConversationInfo] = useState<ConversationModel>();
  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {
    fetchData();

    const pollInterval = setInterval(fetchData, 20000);

    return () => {
      clearInterval(pollInterval);
    };
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const messages = await listOfMessages(currentUserId, Number(id)).list();
      const details = await conversationDetails(
        currentUserId,
        Number(id)
      ).read();
      setConversationInfo(details?.data);
      setMessages(messages?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Template headerMessage={'Chat message'}>
      {isLoading ? (
        <Spinner />
      ) : (
        <ChatComponent
          conversationInfo={conversationInfo}
          messages={messages}
          currentUserId={currentUserId}
          createMessage={createMessage}
        />
      )}
    </Template>
  );
};

export default Chat;
