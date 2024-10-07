// utils/deviceUtils.ts
interface MediaDeviceInfoExtended extends MediaDeviceInfo {
  label: string;
}

interface DevicesState {
  cameras: MediaDeviceInfoExtended[];
  microphones: MediaDeviceInfoExtended[];
  speakers: MediaDeviceInfoExtended[];
}

export async function askDevicePermissions(): Promise<boolean> {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    console.log('Permissions granted');
    return true;
  } catch (error) {
    console.error('Permissions denied:', error);
    return false;
  }
}

export async function queryDevices(): Promise<DevicesState> {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const cameras = devices.filter(
    (device) => device.kind === 'videoinput',
  ) as MediaDeviceInfoExtended[];
  const microphones = devices.filter(
    (device) => device.kind === 'audioinput',
  ) as MediaDeviceInfoExtended[];
  const speakers = devices.filter(
    (device) => device.kind === 'audiooutput',
  ) as MediaDeviceInfoExtended[];

  return { cameras, microphones, speakers };
}
