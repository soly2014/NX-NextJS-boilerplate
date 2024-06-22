import { Button, SharedContent } from '@ui';
import { Chat } from '@chat';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome moi 👋
            </h1>
            <Button>This is MOI</Button>
          </div>
          <Chat />
        </div>
      </div>
    </div>
  );
}
