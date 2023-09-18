import React, { useEffect, useState } from 'react';

import { FaEye } from 'react-icons/fa';

import Styles from './styles.scss';
import { ConversationModel } from '@/domain/models';
import { useHistory } from 'react-router-dom';
import { dateParser } from '@/presentation/utils';

interface IUserElementProps {
  currentUserId: number;
  conversation: ConversationModel;
  'data-testid'?: string;
}

const UserElement: React.FC<IUserElementProps> = ({
  conversation,
  currentUserId,
}) => {
  const history = useHistory();
  const [conversationName, setConversationName] = useState<string>();
  useEffect(() => {
    if (conversation?.name) {
      setConversationName(`Group Chat: ${conversation?.name}`);
      return;
    }
    const chatUser = conversation?.members.find(
      (member) => member?.id !== currentUserId
    );
    setConversationName(`Chat: ${chatUser?.name}`);
  }, [conversation]);

  const handleViewConversation = (): void => {
    history.push(`/chat/${conversation?.id}`);
  };

  return (
    <div className={Styles.userContainer}>
      <div className={Styles.userInfo}>
        <span className={Styles.userName}>{conversationName}</span>
        <span className={Styles.userLastSeen}>
          Last message: {conversation?.last_message?.text || 'No new messages'}
        </span>
        <span className={Styles.userLastSeen}>
          {conversation?.last_message &&
            `Last message: ${dateParser(conversation?.last_message?.sent_at)}`}
        </span>
      </div>
      <div
        className={Styles.iconContainer}
        onClick={handleViewConversation}
        data-testid="viewConversationIconContainer"
      >
        <FaEye className={Styles.icon} />
        <span>View conversation</span>
      </div>
    </div>
  );
};

export default UserElement;
