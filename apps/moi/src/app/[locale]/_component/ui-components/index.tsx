'use client';

import { DEFAULT_COMPONENT_ICONS } from '@azure/communication-react';
import React from 'react';
import { initializeIcons, registerIcons } from '@fluentui/react';
import CallContainer from './CallContainer';
import ChatContainer from './ChatContainer';

initializeIcons();
registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

function App({
  userId,
  endpointUrl,
  meetingLink,
  displayName,
  userAccessToken,
}: {
  userId: string;
  meetingLink: string;
  displayName: string;
  userAccessToken: string;
  endpointUrl: string;
}): JSX.Element {
  return (
    <div className="mx-auto my-0 flex min-h-[60vh] max-w-[90vw] items-center justify-center gap-2 border-2 border-red-700">
      <CallContainer
        userId={userId}
        meetingLink={meetingLink}
        displayName={displayName}
        userAccessToken={userAccessToken}
      />
      <ChatContainer
        userId={userId}
        meetingLink={meetingLink}
        displayName={displayName}
        userAccessToken={userAccessToken}
        endpointUrl={endpointUrl}
      />
    </div>
  );
}

export default App;
