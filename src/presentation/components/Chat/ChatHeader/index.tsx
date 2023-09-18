import React, { useEffect, useState } from 'react';
import { FaUser, FaUsers } from 'react-icons/fa';

import { ConversationModel } from '@/domain/models';

import { Button } from '@/presentation/components';

import Styles from './styles.scss';

interface IChatHeaderProps {
  conversationInfo: ConversationModel;
  currentUserId: number;
  isGroupConversation: boolean;
}

const ChatHeader: React.FC<IChatHeaderProps> = ({
  conversationInfo,
  currentUserId,
  isGroupConversation,
}) => {
  const [conversationName, setConversationName] = useState<string>();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    if (isGroupConversation) {
      setConversationName(`Group Chat: ${conversationInfo?.name}`);
      return;
    }
    const chatUser = conversationInfo?.members.find(
      (member) => member?.id !== currentUserId
    );
    setConversationName(`Chat: ${chatUser.name}`);
  }, [conversationInfo]);

  const showOrHidePopup = (): void => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <div className={Styles.ChatHeader}>
        <div className={Styles.ChatUser}>
          {isGroupConversation ? (
            <FaUsers className={Styles.IconHeader} />
          ) : (
            <FaUser className={Styles.IconHeader} />
          )}
          <span>{conversationName}</span>
        </div>
        {isGroupConversation && (
          <div className={Styles.ButtonContainer}>
            <Button
              className={Styles.InfoBtn}
              title="Group info"
              data-testid="infoButton"
              onClick={showOrHidePopup}
            />
          </div>
        )}
      </div>
      {isPopupVisible && (
        <div className={Styles.Popup}>
          <div className={Styles.PopupContent}>
            <h3>Group members:</h3>
            {conversationInfo?.members.map((member) => {
              return (
                <div key={member?.id}>
                  <span>{member?.name}</span>
                </div>
              );
            })}
            <Button
              className={Styles.InfoBtn}
              title="Close"
              onClick={showOrHidePopup}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
