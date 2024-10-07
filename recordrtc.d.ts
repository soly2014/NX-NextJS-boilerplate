declare module 'recordrtc' {
  // Define the options interface for better type safety
  interface RecordRTCOptions {
    type?: string;
    mimeType?: string;
    disableLogs?: boolean;
    getNativeBlob?: boolean;
    bitsPerSecond?: number;
    timeSlice?: number;
    // Add other options as needed
  }

  export class RecordRTC {
    constructor(
      stream: MediaStream | HTMLCanvasElement | HTMLVideoElement | HTMLElement,
      options?: RecordRTCOptions,
    );

    startRecording(): void;
    stopRecording(callback?: (audioVideoWebMURL: string) => void): void;
    pauseRecording(): void;
    resumeRecording(): void;
    reset(): void;
    save(fileName: string): void;
    setRecordingDuration(milliseconds: number, callback: () => void): void;
    getBlob(): Blob;
    getDataURL(callback: (dataURL: string) => void): void;
    getInternalRecorder(): any;
    getState(): string;
    invokeSaveAsDialog: any;

    // Remove if invokeGetDisplayMedia is not part of RecordRTC instance
    invokeGetDisplayMedia(): any;

    // Add other methods and properties as needed
  }

  // Export functions that are directly available from the module
  export function invokeSaveAsDialog(blob: Blob, fileName?: string): void;
  export function getFromDisk(
    type: string,
    callback: (dataURL: string) => void,
  ): void;
  export function writeToDisk(options: any): void;
  export function invokeGetDisplayMedia(options: any): void;

  // Add other functions as needed
}
