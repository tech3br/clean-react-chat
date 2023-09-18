import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FaEnvelope, FaPowerOff, FaHome } from 'react-icons/fa';

import { ApiContext } from '@/presentation/hooks';

import Styles from './styles.scss';

type TemplateProps = {
  children: React.ReactNode;
  headerMessage: string;
  isDashboard?: boolean;
};

const Template: React.FC<TemplateProps> = ({
  children,
  headerMessage,
  isDashboard = false,
}) => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
  const handleLogoff = (): void => {
    setCurrentAccount(null);
    history.replace('/');
  };

  const handleNewMessageRoute = (): void => {
    history.replace('/new-conversation');
  };

  const handleMenuRoute = (): void => {
    history.replace('/');
  };

  const defineFirstIcon = useCallback((): React.ReactNode => {
    if (isDashboard) {
      return (
        <FaEnvelope
          onClick={() => handleNewMessageRoute()}
          className={Styles.icon}
          title="New message"
          data-testid="newConversationIcon"
        />
      );
    }
    return (
      <FaHome
        onClick={() => handleMenuRoute()}
        className={Styles.icon}
        title="Go to home"
        data-testid="homeIcon"
      />
    );
  }, [isDashboard]);

  return (
    <div className={Styles.container}>
      <img
        className={Styles.image}
        src="https://careers.recruiteecdn.com/image/upload/q_auto,f_auto,w_400,c_limit/production/images/AbRZ/eVtO1Qm_nLJ2.png"
        alt="Bunq logo"
      />
      <div className={Styles.itemsContainer}>
        <div className={Styles.header}>
          <h1 className={Styles.title}>{headerMessage}</h1>

          <div className={Styles.iconContainer}>
            {defineFirstIcon()}
            <FaPowerOff
              onClick={() => handleLogoff()}
              className={Styles.icon}
              title="Log out"
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Template;
