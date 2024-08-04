/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button } from '@ui';
import { CallWithChatExperience } from './_component/call-chat-composite';
import UIComponents from './_component/ui-components';

export const ENDPOINT_URL =
  'https://soly.unitedstates.communication.azure.com/';
export const USER_ID =
  '8:acs:2b236b8e-e9b7-4be0-8757-b43061a56d37_00000021-bcf7-7904-9f3b-8e3a0d00028d';
export const TOKEN =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwNUVCMzFEMzBBMjBEQkRBNTMxODU2MkM4QTM2RDFCMzIyMkE2MTkiLCJ4NXQiOiJZRjZ6SFRDaURiMmxNWVZpeUtOdEd6SWlwaGsiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOjJiMjM2YjhlLWU5YjctNGJlMC04NzU3LWI0MzA2MWE1NmQzN18wMDAwMDAyMS1iY2Y3LTc5MDQtOWYzYi04ZTNhMGQwMDAyOGQiLCJzY3AiOjE3OTIsImNzaSI6IjE3MjI3Njk4NTUiLCJleHAiOjE3MjI4NTYyNTUsInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6ImNoYXQsdm9pcCIsInJlc291cmNlSWQiOiIyYjIzNmI4ZS1lOWI3LTRiZTAtODc1Ny1iNDMwNjFhNTZkMzciLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNzIyNzY5ODU1fQ.KTMC4bUc_j2E7-7Yl4KPI6TwO6WUIopJ-XtwZ0GOtG7pSzb512B1QGTb1zbLKV-TOhfwQBxj87XLBUnOiTScpTwyPU3BxKTG4pWGDykLnZBc356hySIYsg1cMVjKyEXnYvrpHWgiBwvDemsQ6B3moX26aSAUGH5HhfZK3KyZRoD62H4T7jHCTo2Iuvk1Ln48MV-72KVMJeIwhZonwiy9bRnBdynzMFjtPRY-UfyZBsw0bPtZLr1wprBFNDgWARZjfsxO4bBNdCWbyc6tLTiQtbiCk9N111A4YLXJv67vWcMCzFgTIkbMPR6IFBt2GDfuufMMUZ35rcHLXMcmnVVH0w';
export const MEETING_LINK =
  'https://teams.microsoft.com/l/meetup-join/19%3ameeting_YTBkMjFiMmMtNTUzNi00YjVmLTgxOWQtYmJjOTE0ZTc3ZDcx%40thread.v2/0?context=%7b%22Tid%22%3a%221252a2de-b6fc-43d5-a090-215472ae9b25%22%2c%22Oid%22%3a%22edf0ea79-f37c-4d24-9994-ca0fc56a9682%22%7d';

export const extractThreadIdFromMeetingLink = (link: string): string | null => {
  const groupIdArr = link.split('/');
  const threadId = groupIdArr[5];
  return threadId;
};

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  console.log(
    extractThreadIdFromMeetingLink(MEETING_LINK),
    'mEEEEEEEEEEEEEEEEEE',
  );
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
        {/* <div className="m-auto min-h-[90vh] min-w-[90vw]">
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
        </div> */}
      </div>
      <UIComponents
        userId={USER_ID}
        displayName={'Soliman'}
        meetingLink={MEETING_LINK}
        userAccessToken={TOKEN}
        endpointUrl={ENDPOINT_URL}
      />
    </div>
  );
}
