import { create } from "zustand";

interface ContactSubmissionsStore {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

export const useContactSubmissionsStore = create<ContactSubmissionsStore>(
  (set) => ({
    selectedId: null,
    setSelectedId: (id) => set({ selectedId: id }),
  }),
);
