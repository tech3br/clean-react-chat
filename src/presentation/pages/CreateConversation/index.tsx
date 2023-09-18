import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { ApiContext, FormContext } from '@/presentation/hooks';
import { ICreateConversation, IUserListing } from '@/domain/usecases';
import {
  Button,
  Input,
  FormLoaderStatus,
  Select,
} from '@/presentation/components/';
import { Template } from '@/presentation/components';
import { IValidation } from '@/presentation/protocols/validation';

import Styles from './styles.scss';

type CreateConversationProps = {
  createConversation: (userId: number) => ICreateConversation;
  validation: IValidation;
  listOfUsers: IUserListing;
};

const CreateConversation: React.FC<CreateConversationProps> = ({
  validation,
  listOfUsers,
  createConversation,
}) => {
  const { getCurrentAccount } = useContext(ApiContext);
  const currentUserId = getCurrentAccount().userId;
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    user_ids: [],
    name: '',
    userIdsError: '',
    mainError: '',
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await listOfUsers.list();
        setOptions(
          response?.data.map((user) => ({
            label: user?.name,
            value: user?.id,
          }))
        );
      } catch (error) {
        onError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const { user_ids, name } = state;
    const formData = { user_ids, name };
    const userIdsError = validation.validate('user_ids', formData);
    setState({
      ...state,
      userIdsError,
      isFormInvalid: !!userIdsError,
    });
  }, [state.user_ids, state.name]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (state.isLoading || state.isFormInvalid) return;

    try {
      setState({ ...state, isLoading: true });

      const conversationData = state.name
        ? { user_ids: state.user_ids, name: state.name }
        : { user_ids: state.user_ids };

      await createConversation(currentUserId)
        .create(conversationData)
        .then((response) => history.push(`/chat/${response?.data?.id}`));
    } catch (error) {
      onError(error.message);
    }
  };

  const onError = (error: string): void => {
    setState({
      ...state,
      isLoading: false,
      mainError: error,
    });
  };

  return (
    <Template headerMessage="New conversation">
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="createConversationForm"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h1 className={Styles.createConversationTitle}>
            First, select the user (or users) you want to send a message. If you
            want to create a group message, enter the name of the group after
            selecting users.
          </h1>
          <Select
            autoComplete="off"
            name="user_ids"
            title="Select user(s)"
            options={options}
          />
          <Input
            autoComplete="off"
            title="Enter name (only for groups)"
            name="name"
          />
          <div>
            <Button
              className={Styles.createConversationBtn}
              type="submit"
              disabled={state.isFormInvalid}
              title="Create Conversation"
              data-testid="createConversationButton"
            />
          </div>
          <FormLoaderStatus />
        </form>
      </FormContext.Provider>
    </Template>
  );
};

export default CreateConversation;
