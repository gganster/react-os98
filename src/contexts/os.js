import {create} from "zustand";

export const useOSStore = create((set) => ({
  booting: true,
  setBooting: (booting) => set({ booting }),

  windows: [],
  appClick: (id) => {
    set((state) => ({
      ...state,
      windows: state.windows.map(i => ({
        ...i,
        active: i.id === id
      }))
    }))
  },
  startApp: (app) => {
    set((state) => ({
      ...state,
      windows: [
        ...(state.windows.map(i => ({...i, active: false}))),
        {
          ...app,
          id: Date.now(),
          active: true,
          minimized: false
        }
      ]
    }))
  },
  closeApp: (id) => {
    set((state) => ({
      ...state,
      windows: state.windows.filter(i => i.id !== id)
    }))
  },
  minimizeApp: (id) => {
    set((state) => ({
      ...state,
      windows: state.windows.map(i => (
        i.id === id ? {...i, minimized: true} : i))
    }))
  },
  restoreApp: (id) => {
    set((state) => ({
      ...state,
      windows: state.windows.map(i => (
        i.id === id ? {...i, minimized: false} : i))
    }))
  }
}));