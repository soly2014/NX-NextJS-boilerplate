'use client';

import React, { useRef, useEffect } from 'react';

interface RecordDivProps {
  // Add any props for the component here
}

function RecordDiv(props: RecordDivProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const div = divRef.current;

    if (!canvas || !div) return;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = div.offsetWidth;
    canvas.height = div.offsetHeight;

    const captureStream = canvas.captureStream();
    const recorder = new MediaRecorder(captureStream);

    recorder.ondataavailable = (e: BlobEvent) => {
      // Handle recorded data (e.g., save to file)
      const blob = e.data;
      // ...
      console.log(blob);
    };

    recorder.start();

    const drawDiv = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw div content to canvas using ctx.drawImage or similar
      requestAnimationFrame(drawDiv);
    };

    drawDiv();

    return () => {
      recorder.stop();
    };
  }, []);

  return (
    <div>
      <div ref={divRef} className="target-div">
        <video
          id="video"
          width="600"
          controls
          poster="https://assets.codepen.io/32795/poster.png"
        >
          <source
            id="mp4"
            src="http://media.w3.org/2010/05/sintel/trailer.mp4"
            type="video/mp4"
          />
          <source
            id="webm"
            src="http://media.w3.org/2010/05/sintel/trailer.webm"
            type="video/webm"
          />
          <source
            id="ogv"
            src="http://media.w3.org/2010/05/sintel/trailer.ogv"
            type="video/ogg"
          />

          <track
            kind="subtitles"
            label="English subtitles"
            src="subtitles_en.vtt"
            srcLang="en"
            default
          ></track>

          <track
            kind="subtitles"
            label="Deutsche Untertitel"
            src="subtitles_de.vtt"
            srcLang="de"
          ></track>

          <p>Your user agent does not support the HTML5 Video element.</p>
        </video>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default RecordDiv;
