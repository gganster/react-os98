import {create} from "zustand";

export const useOSStore = create((set) => ({
  booting: true,
  setBooting: (booting) => set({ booting }),

  windows: [],
  startApp: () => {

  },
  closeApp: () => {

  },
  minimizeApp: () => {

  },
}));