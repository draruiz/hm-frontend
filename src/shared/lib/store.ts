import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/* ──────────────────────────────────────────────
   Auth slice
   ────────────────────────────────────────────── */
export interface AuthSlice {
  token: string | null;
  tokenSavedAt: number | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

const createAuthSlice: StateCreator<
  AppStore,
  [["zustand/persist", unknown]],
  [],
  AuthSlice
> = (set) => ({
  token: null,
  tokenSavedAt: null,
  isAuthenticated: false,
  // Persistence is handled entirely by the `persist` middleware below;
  // Zustand is the single source of truth for the session.
  setToken: (token) =>
    set({ token, tokenSavedAt: Date.now(), isAuthenticated: true }),
  logout: () =>
    set({ token: null, tokenSavedAt: null, isAuthenticated: false }),
});

/* ──────────────────────────────────────────────
   UI slice (non-sensitive, safe to persist)
   ────────────────────────────────────────────── */
export interface UISlice {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const createUISlice: StateCreator<
  AppStore,
  [["zustand/persist", unknown]],
  [],
  UISlice
> = (set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
});

/* ──────────────────────────────────────────────
   Combined store
   ────────────────────────────────────────────── */
export type AppStore = AuthSlice & UISlice;

export const useAppStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createUISlice(...a),
    }),
    {
      name: "hm-app-store",
      storage: createJSONStorage(() => localStorage),
      // Persist auth token with timestamp (not PHI) and UI state
      partialize: (state) => ({
        token: state.token,
        tokenSavedAt: state.tokenSavedAt,
        isAuthenticated: state.isAuthenticated,
        sidebarOpen: state.sidebarOpen,
      }),
    },
  ),
);
