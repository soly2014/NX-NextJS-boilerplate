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
        <div className="container top-0 col-span-1 float-right text-wrap bg-slate-50 text-right font-extralight">
          <div id="welcome" className="align-center flex p-5">
            <h1 className="align-center flex p-5">
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
