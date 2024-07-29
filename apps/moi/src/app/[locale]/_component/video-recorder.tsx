'use client';
import React, { useState } from 'react';
import RecordRTC from 'recordrtc';

const VideoRecorder = () => {
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');

  const startRecording = async () => {
    const stream = await (RecordRTC as any).invokeGetDisplayMedia({
      video: true,
    });
    const screenRecorder: any = new RecordRTC(stream, { type: 'video' });
    screenRecorder.startRecording();
    setRecorder(screenRecorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recorder) {
      (recorder as any).stopRecording(() => {
        const blob = (recorder as any).getBlob();
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        setIsRecording(false);
      });
    }
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {videoURL && (
        <div>
          <h3>Recorded Video:</h3>
          <video src={videoURL} controls style={{ width: '100%' }}></video>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
