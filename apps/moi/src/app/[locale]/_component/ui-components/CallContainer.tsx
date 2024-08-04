'use client';

import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import {
  DEFAULT_COMPONENT_ICONS,
  CallClientProvider,
  CallAgentProvider,
  CallProvider,
  createStatefulCallClient,
  StatefulCallClient,
} from '@azure/communication-react';
import React, { useEffect, useState } from 'react';
import CallingComponents from './CallingComponentsStateful';
import { initializeIcons, registerIcons } from '@fluentui/react';
import { Call, CallAgent } from '@azure/communication-calling';

initializeIcons();
registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

function CallContainer({
  userId,
  meetingLink,
  displayName,
  userAccessToken,
}: {
  userId: string;
  meetingLink: string;
  displayName: string;
  userAccessToken: string;
}): JSX.Element {
  const [statefulCallClient, setStatefulCallClient] =
    useState<StatefulCallClient>();
  const [callAgent, setCallAgent] = useState<CallAgent>();
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    const statefulCallClient = createStatefulCallClient({
      userId: { communicationUserId: userId },
    });

    // Request camera and microphone access once we have access to the device manager
    statefulCallClient.getDeviceManager().then((deviceManager) => {
      deviceManager.askDevicePermission({ video: true, audio: true });
    });

    setStatefulCallClient(statefulCallClient);
  }, []);

  useEffect(() => {
    const tokenCredential = new AzureCommunicationTokenCredential(
      userAccessToken,
    );
    if (callAgent === undefined && statefulCallClient && displayName) {
      const createUserAgent = async () => {
        setCallAgent(
          await statefulCallClient.createCallAgent(tokenCredential, {
            displayName: displayName,
          }),
        );
      };
      createUserAgent();
    }
  }, [statefulCallClient, displayName, callAgent]);

  useEffect(() => {
    if (callAgent !== undefined) {
      setCall(callAgent.join({ meetingLink }));
    }
  }, [callAgent]);

  return (
    <>
      {statefulCallClient && (
        <CallClientProvider callClient={statefulCallClient}>
          {callAgent && (
            <CallAgentProvider callAgent={callAgent}>
              {call && (
                <CallProvider call={call}>
                  <CallingComponents />
                </CallProvider>
              )}
            </CallAgentProvider>
          )}
        </CallClientProvider>
      )}
    </>
  );
}

export default CallContainer;
