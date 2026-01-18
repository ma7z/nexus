import { create } from "zustand";

type PageLoadingStore = {
  pending: number;
  start: () => void;
  finish: () => void;
};

export const usePageLoadingStore = create<PageLoadingStore>((set) => ({
  pending: 0,
  start: () => set((state) => ({ pending: state.pending + 1 })),
  finish: () =>
    set((state) => ({
      pending: Math.max(0, state.pending - 1),
    })),
}));
