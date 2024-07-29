'use client';
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const ScreenRecorder: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const captureDiv = async (): Promise<MediaStream> => {
    const div = divRef.current;
    if (!div) throw new Error('Div not found');

    const canvas = await html2canvas(div);
    return canvas.captureStream();
  };

  const captureAudio = async (): Promise<MediaStream> => {
    return navigator.mediaDevices.getUserMedia({ audio: true });
  };

  const getCombinedStream = async (): Promise<MediaStream> => {
    const videoStream = await captureDiv();
    const audioStream = await captureAudio();

    const combinedStream = new MediaStream();
    videoStream.getTracks().forEach((track) => combinedStream.addTrack(track));
    audioStream.getTracks().forEach((track) => combinedStream.addTrack(track));

    return combinedStream;
  };

  const startRecording = async () => {
    const stream = await getCombinedStream();
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);

      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.play();
      }
    };

    setMediaRecorder(recorder);
    recorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  return (
    <div>
      <div
        ref={divRef}
        style={{ width: '640px', height: '480px', border: '1px solid black' }}
      >
        {/* Content to record */}
        <p>Hello, this is a test content!</p>
      </div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video ref={videoRef} controls></video>
    </div>
  );
};

export default ScreenRecorder;
