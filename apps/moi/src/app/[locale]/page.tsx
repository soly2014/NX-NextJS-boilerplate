import { Button } from '@ui';
import { CallWithChatExperience } from './_component/call-chat-composite';
import UIComponents from './_component/ui-components';

export const ENDPOINT_URL =
  'https://soly.unitedstates.communication.azure.com/';
export const USER_ID =
  '8:acs:2b236b8e-e9b7-4be0-8757-b43061a56d37_00000021-aa70-221c-9806-113a0d008c2c';
export const TOKEN =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwNUVCMzFEMzBBMjBEQkRBNTMxODU2MkM4QTM2RDFCMzIyMkE2MTkiLCJ4NXQiOiJZRjZ6SFRDaURiMmxNWVZpeUtOdEd6SWlwaGsiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOjJiMjM2YjhlLWU5YjctNGJlMC04NzU3LWI0MzA2MWE1NmQzN18wMDAwMDAyMS1hYTcwLTIyMWMtOTgwNi0xMTNhMGQwMDhjMmMiLCJzY3AiOjE3OTIsImNzaSI6IjE3MjI0NTg5OTYiLCJleHAiOjE3MjI1NDUzOTYsInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6ImNoYXQsdm9pcCIsInJlc291cmNlSWQiOiIyYjIzNmI4ZS1lOWI3LTRiZTAtODc1Ny1iNDMwNjFhNTZkMzciLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNzIyNDU4OTk2fQ.jP8P0i5EwVH_Z8u5K6tqYNiDfgA9G4stQLv8xqWEtNFNdvr5k7bH4D6VIZKkPFCPv50BU08Gmx-CR2S1aEewl5EXQ7jnu5MLfYinJl9YxiSGclJV4CJP2QfSzq4UeYV0pUY01wH6iKFIojJjUkNF1NT7nSr9wwD1u-8fs2Qn4iBfgXPyvWPmCVtV64z2ei2ft9OmFUYD7W2uPI0xALjmBd_ArS2rsNZYDJmo7UhrEGWjLcOorhEWX13_8LOF119l56uv_tJBv2pkNV1zPBm8WvLVTarZdscHDJeDqbQwKjyKwnhIB8d8cnDSf6tM__G_qwVk7MwekCIVdPCjK69N6A';
export const MEETING_LINK =
  'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MDYwN2ViOTItODg1MS00ODk1LWFkYzMtNWQ1Njc2MTFlYjY4%40thread.v2/0?context=%7b%22Tid%22%3a%221252a2de-b6fc-43d5-a090-215472ae9b25%22%2c%22Oid%22%3a%22edf0ea79-f37c-4d24-9994-ca0fc56a9682%22%7d';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <div className="wrapper flex flex-col gap-10">
        <div className="container top-0 col-span-1 float-right text-wrap bg-slate-50 text-right font-extralight">
          <div id="welcome" className="align-center flex p-5">
            <h1 className="align-center flex p-5">
              <span> Hello there, </span>
              Welcome moi 👋
            </h1>
            <Button>This is MOI</Button>
          </div>
        </div>
        {/* <UIComponents /> */}
        <div className="m-auto min-h-[90vh] min-w-[90vw]">
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
                displayType: 'compact', // | 'compact'
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
      </div>
      <UIComponents />
    </div>
  );
}
