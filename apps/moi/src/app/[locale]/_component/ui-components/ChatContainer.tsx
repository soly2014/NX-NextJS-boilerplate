import { ChatThreadClient } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import {
  createStatefulChatClient,
  ChatClientProvider,
  ChatThreadClientProvider,
} from '@azure/communication-react';
import React from 'react';
import ChatComponents from './ChatComponentsStateful';
import { v4 as uuidv4 } from 'uuid'; // Import v4 function from uuid
import { extractThreadIdFromMeetingLink } from '../../page';

function ChatContainer({
  userId,
  displayName,
  meetingLink,
  userAccessToken,
  endpointUrl,
}: {
  userId: string;
  meetingLink: string;
  displayName: string;
  userAccessToken: string;
  endpointUrl: string;
}): JSX.Element {
  const tokenCredential = new AzureCommunicationTokenCredential(
    userAccessToken,
  );

  const threadId = extractThreadIdFromMeetingLink(meetingLink);
  console.log(threadId, 'thread');
  if (!threadId) {
    return <div>Loading chat...</div>;
  }
  // Instantiate the statefulChatClient
  const statefulChatClient = createStatefulChatClient({
    userId: { communicationUserId: userId },
    displayName: displayName,
    endpoint: endpointUrl,
    credential: tokenCredential,
  });

  // Listen to notifications
  statefulChatClient.startRealtimeNotifications();

  const chatThreadClient = statefulChatClient.getChatThreadClient(threadId);
  // Fetch thread properties, participants etc.
  // Past messages are fetched as needed when the user scrolls to them.
  initializeThreadState(chatThreadClient);

  return (
    <>
      <ChatClientProvider chatClient={statefulChatClient}>
        <ChatThreadClientProvider chatThreadClient={chatThreadClient}>
          <ChatComponents />
        </ChatThreadClientProvider>
      </ChatClientProvider>
    </>
  );
}

async function initializeThreadState(
  chatThreadClient: ChatThreadClient,
): Promise<void> {
  await chatThreadClient.getProperties();
  for await (const _page of chatThreadClient.listParticipants().byPage()) {
    // Simply fetching participants updates the cached state in client.
  }
}

export default ChatContainer;
