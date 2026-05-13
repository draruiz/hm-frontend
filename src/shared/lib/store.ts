import { create, type StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/* ──────────────────────────────────────────────
   Auth slice
   ────────────────────────────────────────────── */
export interface AuthSlice {
  token: string | null;
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
  isAuthenticated: false,
  setToken: (token) => {
    sessionStorage.setItem("access_token", token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    sessionStorage.removeItem("access_token");
    set({ token: null, isAuthenticated: false });
  },
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
      storage: createJSONStorage(() => sessionStorage),
      // Only persist non-PHI, non-sensitive UI state
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
      }),
    },
  ),
);
