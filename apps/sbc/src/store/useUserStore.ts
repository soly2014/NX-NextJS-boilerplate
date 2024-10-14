import { create } from 'zustand';

export type ServiceType =
  | 'gosi-establishment'
  | 'new-est'
  | 'gosi-public'
  | 'gosi-ppa'
  | 'new-gosi';

interface UserState {
  fullname: string;
  nin: string;
  mobile: string;
  serviceType: ServiceType;
  setFullname: (fullname: string) => void;
  setNin: (nin: string) => void;
  setMobile: (mobile: string) => void;
  setServiceType: (serviceType: ServiceType) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  fullname: '',
  nin: '',
  mobile: '',
  serviceType: 'gosi-establishment', // Default value
  setFullname: (fullname) => set({ fullname }),
  setNin: (nin) => set({ nin }),
  setMobile: (mobile) => set({ mobile }),
  setServiceType: (serviceType) => set({ serviceType }),
  resetUser: () =>
    set({
      fullname: '',
      nin: '',
      mobile: '',
      serviceType: 'gosi-establishment',
    }),
}));
