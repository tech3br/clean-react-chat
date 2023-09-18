import React, { useCallback } from 'react';
import { Dashboard } from '@/presentation/pages';
import { makeRemoteConversationListing } from '../../usecases';

const makeDashboard: React.FC = () => {
  const makeConversationListing = useCallback(
    makeRemoteConversationListing,
    []
  );

  return <Dashboard listOfConversations={makeConversationListing} />;
};

export default makeDashboard;
