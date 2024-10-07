import create, { StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface DeviceSettingsState {
  camera: string;
  microphone: string;
  speaker: string;
  setCamera: (camera: string) => void;
  setMicrophone: (microphone: string) => void;
  setSpeaker: (speaker: string) => void;
}

type MyPersist = (
  config: StateCreator<DeviceSettingsState>,
  options: PersistOptions<DeviceSettingsState>,
) => StateCreator<DeviceSettingsState>;

export const useDeviceSettingsStore = create<DeviceSettingsState>(
  (persist as MyPersist)(
    (set) => ({
      camera: '',
      microphone: '',
      speaker: '',
      setCamera: (camera) => set({ camera }),
      setMicrophone: (microphone) => set({ microphone }),
      setSpeaker: (speaker) => set({ speaker }),
    }),
    {
      name: 'device-settings', // Name of the localStorage key
    },
  ),
);
