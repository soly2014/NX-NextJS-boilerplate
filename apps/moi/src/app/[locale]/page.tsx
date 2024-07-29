import { Button } from '@ui';
import ScreenRecorder from './_component/screen-recorder';
import RecordDiv from './_component/canvas-record';
import VideoRecorder from './_component/video-recorder';
import App from './_component/call-with-chat-composite';
import { CallWithChatExperience } from './_component/call-chat-composite';

export const ENDPOINT_URL =
  'https://soly.unitedstates.communication.azure.com/';
export const USER_ID =
  '8:acs:2b236b8e-e9b7-4be0-8757-b43061a56d37_00000021-9980-fcbb-bc66-563a0d00b0fb';
export const TOKEN =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwNUVCMzFEMzBBMjBEQkRBNTMxODU2MkM4QTM2RDFCMzIyMkE2MTkiLCJ4NXQiOiJZRjZ6SFRDaURiMmxNWVZpeUtOdEd6SWlwaGsiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOjJiMjM2YjhlLWU5YjctNGJlMC04NzU3LWI0MzA2MWE1NmQzN18wMDAwMDAyMS05OTgwLWZjYmItYmM2Ni01NjNhMGQwMGIwZmIiLCJzY3AiOjE3OTIsImNzaSI6IjE3MjIxNzQ4ODgiLCJleHAiOjE3MjIyNjEyODgsInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6ImNoYXQsdm9pcCIsInJlc291cmNlSWQiOiIyYjIzNmI4ZS1lOWI3LTRiZTAtODc1Ny1iNDMwNjFhNTZkMzciLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNzIyMTc0ODg4fQ.JnzT6O59gpjBz1fMIq-bQp7lYph1gdIyDJaJMSDwLRc-507MEZVYInASToWMit0i09wNJzqsEFWDdI_D5qhiHZUkBm0we22V-yffTQJrtKXvTS-uhlouhB3uKaLa_ZESSaeJak0hFWtiTzMrjTq3KATOV6lSNXvd_nC-zFgY3cDnKHHwck40Xa82c7DJ1WyjHczT5VdAwZ5a3IUjGKhs9esEJ24GJyFYtF_4ly-6OPiOsIn0D-5CNgC5qbKtYBybNcLTXOYYZb3uB7lKNv8msanIgm2Nt__OHtcSUgALuNLjWcUEzlCQwpAo6t-JTI9hWs5lFpPJPPOCuiUzBehVWQ';
export const MEETING_LINK =
  'https://teams.microsoft.com/l/meetup-join/19%3ameeting_YzgzOGQ0YjgtOGQwZi00ZmRkLThhMWQtNzNlZThlZjg2MTAz%40thread.v2/0?context=%7b%22Tid%22%3a%221252a2de-b6fc-43d5-a090-215472ae9b25%22%2c%22Oid%22%3a%22edf0ea79-f37c-4d24-9994-ca0fc56a9682%22%7d';

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
          <div id="container"></div>
          <h1>Screen Recorder</h1>
          {/* <VideoRecorder /> */}
          {/* <RecordDiv /> */}

          {/* <App /> */}
          <div></div>
        </div>
        <div className="m-auto max-h-[1200px]">
          <CallWithChatExperience
            userId={{ communicationUserId: USER_ID }}
            token={TOKEN}
            endpointUrl={ENDPOINT_URL}
            displayName="SOLY"
            locator={{
              meetingLink: MEETING_LINK,
            }}
            formFactor="mobile"
            compositeOptions={
              {
                // callControls: {
                //   devicesButton: false,
                //   cameraButton: true,
                //   chatButton: true,
                //   displayType: 'compact', // | 'compact'
                //   dtmfDialerButton: false,
                //   endCallButton: true,
                //   exitSpotlightButton: true,
                //   microphoneButton: true,
                //   moreButton: true,
                //   participantsButton: true,
                //   peopleButton: false,
                //   raiseHandButton: false,
                //   reactionButton: true,
                //   screenShareButton: true,
                //   teamsMeetingPhoneCallButton: false,
                // },
              }
            }
          />
        </div>
      </div>
    </div>
  );
}
