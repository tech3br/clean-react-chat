import React, { useContext, useEffect, useState } from 'react';

import { ApiContext } from '@/presentation/hooks';
import { ConversationModel } from '@/domain/models';
import { IConversationListing } from '@/domain/usecases';

import { Template, UserElement, Spinner } from '@/presentation/components';

type DashboardProps = {
  listOfConversations: (userId: number) => IConversationListing;
};

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  const { getCurrentAccount } = useContext(ApiContext);
  const currentUser = getCurrentAccount();
  const [conversations, setConversations] = useState<ConversationModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await props.listOfConversations(currentUser?.userId).list();
        setConversations(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Template
      headerMessage={`Welcome, ${currentUser?.name}.`}
      isDashboard={true}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        conversations.map((conversation) => {
          {
            conversation;
          }
          return (
            <UserElement
              key={conversation?.id}
              conversation={conversation}
              currentUserId={currentUser?.userId}
            />
          );
        })
      )}
    </Template>
  );
};

export default Dashboard;
