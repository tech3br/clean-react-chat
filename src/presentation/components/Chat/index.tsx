import React, { useEffect, useState } from 'react';

import { ConversationModel, MessageModel } from '@/domain/models';
import { ICreateMessage } from '@/domain/usecases';

import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatMessage from './ChatMessage';

import Styles from './styles.scss';

interface IChatProps {
  conversationInfo: ConversationModel;
  messages: MessageModel[];
  currentUserId: number;
  createMessage: (userId: number, conversationId: number) => ICreateMessage;
}

const ChatComponent: React.FC<IChatProps> = ({
  conversationInfo,
  messages,
  currentUserId,
  createMessage,
}) => {
  const [isGroupConversation, setIsGroupConversation] = useState<boolean>(true);
  const [chatMessages, setChatMessages] = useState<MessageModel[]>(messages);

  useEffect(() => {
    const isGroup =
      (conversationInfo?.name && conversationInfo?.members?.length > 2) ||
      false;
    setIsGroupConversation(isGroup);
  }, [conversationInfo]);

  const handleNewMessage = (newMessage: MessageModel): void => {
    setChatMessages([newMessage, ...chatMessages]);
  };

  return (
    <div className={Styles.ChatContainer}>
      <ChatHeader
        conversationInfo={conversationInfo}
        currentUserId={currentUserId}
        isGroupConversation={isGroupConversation}
        data-testid="chatHeader"
      />
      <div
        className={Styles.MessagesContainer}
        data-testid="chatMessageContainer"
      >
        {chatMessages.map((message) => (
          <ChatMessage
            key={message?.id}
            message={message}
            currentUserId={currentUserId}
            conversationInfoMembers={conversationInfo?.members}
            data-testid="chatMessage"
          />
        ))}
      </div>
      <ChatFooter
        conversationInfo={conversationInfo}
        createMessage={createMessage}
        currentUserId={currentUserId}
        newMessageSent={handleNewMessage}
        data-testid="chatFooter"
      />
    </div>
  );
};

export default ChatComponent;
