import create from 'zustand';
import { CallWithChatAdapter } from '@azure/communication-react';

// Define the Zustand store
type AdapterState = {
  adapter: CallWithChatAdapter | null;
  setAdapter: (adapter: CallWithChatAdapter | null) => void;
};

export const useAdapterStore = create<AdapterState>((set) => ({
  adapter: null,
  setAdapter: (adapter: CallWithChatAdapter | null) => set({ adapter }),
}));
