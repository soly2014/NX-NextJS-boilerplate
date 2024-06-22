import { Button } from '@ui';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <div className="wrapper">
        <div className="container top-0 text-wrap col-span-1 font-extralight bg-slate-50 float-right text-right">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome sbc 👋
            </h1>
            <Button>This is SBC</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
