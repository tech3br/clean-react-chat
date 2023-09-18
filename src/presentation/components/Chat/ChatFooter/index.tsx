import React, { useEffect, useState } from 'react';

import { FormContext } from '@/presentation/hooks';
import { ConversationModel, MessageModel } from '@/domain/models';
import { ICreateMessage } from '@/domain/usecases';

import { Button } from '@/presentation/components';

import Styles from './styles.scss';

interface IChatFooterProps {
  conversationInfo: ConversationModel;
  currentUserId: number;
  createMessage: (userId: number, conversationId: number) => ICreateMessage;
  newMessageSent: (message: MessageModel) => void;
}

const ChatFooter: React.FC<IChatFooterProps> = ({
  conversationInfo,
  currentUserId,
  createMessage,
  newMessageSent,
}) => {
  const initialState = {
    isLoading: false,
    isFormInvalid: true,
    text: '',
    mainError: '',
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const { text } = state;
    setState({
      ...state,
      isFormInvalid: !text,
    });
  }, [state.text]);

  const handleInputChange = (
    event: React.FocusEvent<HTMLInputElement>
  ): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSendMessage = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) return;

      setState({ ...state, isLoading: true });

      const { text } = state;
      await createMessage(currentUserId, conversationInfo?.id)
        .create({ text })
        .then(() =>
          newMessageSent({
            id: Math.random(),
            user_id: currentUserId,
            text,
            sent_at: new Date().toISOString(),
          })
        );
      setState(initialState);
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message,
      });
    }
  };

  return (
    <div className={Styles.ChatFooter}>
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="messageForm"
          className={Styles.Form}
          onSubmit={handleSendMessage}
        >
          <input
            autoComplete="off"
            name="text"
            data-testid="chatInputMessage"
            value={state.text}
            onChange={handleInputChange}
            placeholder="Write here..."
            className={Styles.Input}
            type="text"
          />

          <div className={Styles.ButtonContainer}>
            <Button
              className={Styles.MessageBtn}
              type="submit"
              disabled={state.isFormInvalid}
              title="Send message"
              data-testid="chatInpuButton"
            />
          </div>
        </form>
      </FormContext.Provider>
    </div>
  );
};

export default ChatFooter;
