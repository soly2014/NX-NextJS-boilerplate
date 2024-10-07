'use client';

import {
  TeamsMeetingIdLocator,
  TeamsMeetingLinkLocator,
} from '@azure/communication-calling';
import {
  AzureCommunicationTokenCredential,
  CommunicationUserIdentifier,
} from '@azure/communication-common';
import {
  CallAndChatLocator,
  CallWithChatComposite,
  useAzureCommunicationCallWithChatAdapter,
  CallWithChatCompositeOptions,
} from '@azure/communication-react';
import { Theme, PartialTheme, Spinner, initializeIcons } from '@fluentui/react';
import { Button } from '@ui';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ReloadIcon, UploadIcon } from '@radix-ui/react-icons';
import { ARLocale } from './locale/ar';

initializeIcons();

export type CallWithChatExampleProps = {
  // Props needed for the construction of the CallWithChatAdapter
  userId: CommunicationUserIdentifier;
  token: string;
  displayName: string;
  endpointUrl: string;
  /**
   * For CallWithChat you need to provide either a teams meeting locator or a CallAndChat locator
   * for the composite
   *
   * CallAndChatLocator: This locator is comprised of a groupId call locator and a chat thread
   * threadId for the session. See documentation on the {@link CallAndChatLocator} to see types of calls supported.
   * {callLocator: ..., threadId: ...}
   *
   * TeamsMeetingLinkLocator: this is a special locator comprised of a Teams meeting link
   * {meetingLink: ...}
   */
  locator: TeamsMeetingLinkLocator | CallAndChatLocator | TeamsMeetingIdLocator;

  // Props to customize the CallWithChatComposite experience
  fluentTheme?: PartialTheme | Theme;
  rtl?: boolean;
  compositeOptions?: CallWithChatCompositeOptions;
  callInvitationURL?: string;
  formFactor?: 'desktop' | 'mobile';
  onCallEnded: () => void;
  cameraId?: string;
  microphoneId?: string;
  speakerId?: string;
  meetingId: string;
  setIsCallAdmitted?: any;
};

export const CallWithChatExperience = ({
  displayName,
  endpointUrl,
  locator,
  setIsCallAdmitted,
  rtl,
  compositeOptions,
  onCallEnded,
  token,
  userId,
  callInvitationURL,
  cameraId,
  fluentTheme,
  formFactor,
  microphoneId,
  speakerId,
  meetingId,
}: CallWithChatExampleProps): JSX.Element => {
  // Construct a credential for the user with the token retrieved from your server. This credential
  // must be memoized to ensure useAzureCommunicationCallWithChatAdapter is not retriggered on every render pass.
  const credential = useMemo(
    () => new AzureCommunicationTokenCredential(token),
    [token],
  );

  // Create the adapter using a custom react hook provided in the @azure/communication-react package.
  // See https://aka.ms/acsstorybook?path=/docs/composite-adapters--page for more information on adapter construction and alternative constructors.
  const adapter = useAzureCommunicationCallWithChatAdapter({
    userId: userId,
    displayName: displayName,
    credential,
    locator: locator,
    endpoint: endpointUrl,
  });

  const [isDesktopChatOpen, setIsDesktopChatOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isFileUploadLoading, setIsFileUploadLoading] = useState(false);

  adapter?.onStateChange((state) => {
    if (state?.call?.state === 'Connected') {
      setIsCallAdmitted(true);
    }
  });

  adapter?.on('callEnded', () => {
    adapter.leaveCall();
    onCallEnded();
  });

  adapter?.off('callEnded', () => {
    adapter.leaveCall();
    onCallEnded();
  });

  useEffect(() => {
    const checkChatVisibility = () => {
      // Select the chat container using data-ui-id
      const chatContainer: any = document.querySelector(
        `[role="heading"][aria-label="${rtl ? 'الدردشة' : 'Chat'}"][aria-level="2"]`,
      );
      const chatElement: any = document.querySelector('#sendbox');
      if (chatElement) {
        const isVisible =
          chatElement.offsetWidth > 0 && chatElement.offsetHeight > 0;
        setIsMobileChatOpen(isVisible);
      } else {
        setIsMobileChatOpen(false);
      }

      // Check if the element exists and is visible
      if (chatContainer) {
        const isVisible =
          chatContainer.offsetWidth > 0 && chatContainer.offsetHeight > 0;
        setIsDesktopChatOpen(isVisible);
      } else {
        setIsDesktopChatOpen(false);
      }
    };

    // Check visibility initially
    checkChatVisibility();

    // Optionally, set up an interval to check visibility periodically
    const interval = setInterval(checkChatVisibility, 500);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (adapter) {
      const setDevices = async () => {
        const microphones = await adapter.queryMicrophones();
        const cameras = await adapter.queryCameras();
        const speakers = await adapter.querySpeakers();
        // Setting camera, speaker, and microphone...
        if (cameraId) {
          const myCam: any = cameras.find((c: any) => {
            return c['_id'].replace('camera:', '') === cameraId;
          });
          if (myCam) {
            adapter.setCamera(myCam);
          }
        }
        if (speakerId) {
          const mySpeaker: any = speakers.find((c: any) => {
            return c['_id'].replace('speaker:', '') === speakerId;
          });
          if (mySpeaker) {
            adapter.setSpeaker(mySpeaker);
          }
        }
        if (microphoneId) {
          const myMic: any = microphones.find((c: any) => {
            return c['_id'].replace('microphone:', '') === microphoneId;
          });
          if (myMic) {
            adapter.setMicrophone(myMic);
          }
        }
        // Automatically join the call once the adapter is ready
        setIsCallAdmitted && adapter.joinCall({ microphoneOn: false });
      };

      if (adapter) {
        setDevices();
      }
    }
  }, [adapter, cameraId, microphoneId, speakerId]);

  useEffect(() => {
    if (adapter) {
      const captionsReceivedHandler = (e: any) => {
        console.log('Captions received:', e);
      };
      adapter.on('captionsReceived', captionsReceivedHandler);

      return () => {
        adapter.off('captionsReceived', captionsReceivedHandler);
      };
    }
  }, [adapter]);

  // Create a ref to the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setIsFileUploadLoading(true);

      // Check if the file has an allowed extension
      const allowedFileExtensions = ['pdf', 'jpeg', 'png', 'jpg'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!allowedFileExtensions.includes(fileExtension!)) {
        alert('File type not allowed. Please upload a pdf, jpeg, png, or jpg.');
        setIsFileUploadLoading(false);
        return;
      }

      // Create FormData object
      const formData = new FormData();
      formData.append('file', file);
      formData.append('callId', meetingId);

      const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

      // ="https://gosivvas-report-api-uat.azurewebsites.net/"

      const url = `${baseURL}Attatchment/customer/upload`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
          headers: {
            'content-length': `${file.size}`,
          },
        });
        const result = await response.json();

        // Assuming the result contains a file path or URL, you can use it in your message
        if (result && result.filePath) {
          handleMessageSend(`File uploaded successfully: ${result.filePath}`);
        } else {
          handleMessageSend('File uploaded successfully.');
        }
      } catch (error) {
        handleMessageSend('Error uploading file');
        console.error('Error:', error);
      } finally {
        setIsFileUploadLoading(false);
      }
    }

    // Reset the file input value to allow re-upload of the same file
    event.target.value = '';
  };

  // The adapter is created asynchronously by the useAzureCommunicationCallWithChatAdapter hook.
  // Here we show a spinner until the adapter has finished constructing.
  if (!adapter) {
    return (
      <div className="flex min-h-[80dvh] items-center justify-center">
        <Spinner label={rtl ? 'جارى التجهيز...' : 'Initializing...'} />
      </div>
    );
  }

  const handleMessageSend = (message: string) => {
    adapter.sendMessage(message);
  };

  return (
    <>
      <div className="relative">
        {/* {isDesktopChatOpen || isMobileChatOpen ? ( */}

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />

        {/* Custom upload button */}
        {isDesktopChatOpen && (
          <Button
            className="absolute end-12 top-3 z-[9999] text-white"
            onClick={() => fileInputRef.current?.click()}
            // variant={'secondary'}
            disabled={isFileUploadLoading}
          >
            {isFileUploadLoading ? (
              <ReloadIcon className="animate-spin" />
            ) : (
              <UploadIcon />
            )}
          </Button>
        )}
        {isMobileChatOpen && !isDesktopChatOpen ? (
          <span
            className="absolute bottom-4 end-10 z-[9999]"
            onClick={() =>
              !isFileUploadLoading && fileInputRef.current?.click()
            }
          >
            {isFileUploadLoading ? (
              <ReloadIcon className="h-5 w-5 animate-spin" />
            ) : (
              <UploadIcon className="h-5 w-5" />
            )}
          </span>
        ) : null}

        {/* ) : null} */}

        <CallWithChatComposite
          adapter={adapter}
          fluentTheme={fluentTheme}
          rtl={rtl}
          formFactor={formFactor}
          joinInvitationURL={callInvitationURL}
          options={compositeOptions}
          locale={rtl ? ARLocale : undefined}
        />
      </div>
      <div className="min-h-20"></div>
    </>
  );
};
