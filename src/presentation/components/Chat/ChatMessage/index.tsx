import React, { useEffect, useState } from 'react';

import { MessageModel, UserModel } from '@/domain/models';
import { dateParser } from '@/presentation/utils';

import Styles from './styles.scss';

interface IChatMessageProps {
  message: MessageModel;
  currentUserId: number;
  conversationInfoMembers: Array<UserModel>;
}

const ChatMessage: React.FC<IChatMessageProps> = ({
  message,
  currentUserId,
  conversationInfoMembers,
}) => {
  const isCurrentUserTheSender = currentUserId === message?.user_id;
  const [senderName, setSenderName] = useState<string>('');

  useEffect(() => {
    conversationInfoMembers.forEach((member) => {
      if (member?.id === message?.user_id) setSenderName(member?.name);
    });
  }, [conversationInfoMembers]);

  return (
    <div className={Styles.MessageContainer}>
      <span
        className={
          isCurrentUserTheSender ? Styles.MessageSender : Styles.MessageReceiver
        }
      >
        {isCurrentUserTheSender ? 'You' : senderName}
      </span>
      <span className={Styles.MessageContent}>{message?.text}</span>
      <span className={Styles.MessageDate}>Sent at: {dateParser(message?.sent_at)}</span>
    </div>
  );
};

export default ChatMessage;
