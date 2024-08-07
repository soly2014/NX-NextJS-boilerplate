import { CallWithChatExperience } from './call-with-chat-experience';
import './style.css';

export const ENDPOINT_URL =
  'https://soly.unitedstates.communication.azure.com/';
export const USER_ID =
  '8:acs:2b236b8e-e9b7-4be0-8757-b43061a56d37_00000021-c6b7-24db-7137-8e3a0d0064e1';
export const TOKEN =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwNUVCMzFEMzBBMjBEQkRBNTMxODU2MkM4QTM2RDFCMzIyMkE2MTkiLCJ4NXQiOiJZRjZ6SFRDaURiMmxNWVZpeUtOdEd6SWlwaGsiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOjJiMjM2YjhlLWU5YjctNGJlMC04NzU3LWI0MzA2MWE1NmQzN18wMDAwMDAyMS1jNmI3LTI0ZGItNzEzNy04ZTNhMGQwMDY0ZTEiLCJzY3AiOjE3OTIsImNzaSI6IjE3MjI5MzM0MTIiLCJleHAiOjE3MjMwMTk4MTIsInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6ImNoYXQsdm9pcCIsInJlc291cmNlSWQiOiIyYjIzNmI4ZS1lOWI3LTRiZTAtODc1Ny1iNDMwNjFhNTZkMzciLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNzIyOTMzNDEyfQ.Xmk4sesHw-IsZrQi5XGUYnoECnwRtd5OOy_WPnlBmHPI4TtGk-9iuORlbvVYM-WUUOuCI6gjXy65PPmRxmWMhvmpbBUo17HVLqYfyXZZ50KavEme2AzQ5dueCheHiAuWOLpmV_qWSNfOTvWs1woTO8g6fP16nTD5Ej4BSr3ZsRBOUJmhdEprvEHPSCEvajDYVTuj85FAev_5nwok77ep8HXM4tBgsaCwWDVI-UlWoPrDavF5kAHmXweFxQ6EI9HUFS65VoBkZYwtf3xz7KXj78lKME9HtzoOEP50DVbxYjbzFwDNlFvubAalWkASd6TxssRA3QXAcws3V3oJ7WBfWA';
export const MEETING_LINK =
  'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NTNlNmUxMDktMjUzMC00MTViLWFlYjgtZWEyOTlhNjgyYjRi%40thread.v2/0?context=%7b%22Tid%22%3a%221252a2de-b6fc-43d5-a090-215472ae9b25%22%2c%22Oid%22%3a%22edf0ea79-f37c-4d24-9994-ca0fc56a9682%22%7d';

export const TeamsCallChat = () => {
  return (
    <div className="relative m-auto min-h-[90vh] min-w-[98vw]">
      <CallWithChatExperience
        userId={{ communicationUserId: USER_ID }}
        token={TOKEN}
        endpointUrl={ENDPOINT_URL}
        displayName="SOLY"
        locator={{
          meetingLink: MEETING_LINK,
        }}
        formFactor="desktop"
        compositeOptions={{
          callControls: {
            devicesButton: true,
            cameraButton: true,
            chatButton: true,
            displayType: 'default', // | 'compact'
            dtmfDialerButton: true,
            endCallButton: true,
            exitSpotlightButton: true,
            microphoneButton: true,
            moreButton: true,
            participantsButton: true,
            peopleButton: true,
            raiseHandButton: true,
            reactionButton: true,
            screenShareButton: true,
            teamsMeetingPhoneCallButton: true,
          },

          branding: {
            logo: {
              url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
              alt: 'React Logo',
              shape: 'circle',
            },
            backgroundImage: {
              url: 'https://media.istockphoto.com/id/1391163275/photo/restored-salwa-palace-under-twilight-sky.jpg?s=1024x1024&w=is&k=20&c=7j-QTfFa-oCOvtxjGOCOCMgCNKL6z3kj83Y36QrpxEM=',
            },
          },
          //surveyOptions:{}
        }}
      />
    </div>
  );
};
