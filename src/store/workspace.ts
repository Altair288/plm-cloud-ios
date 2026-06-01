import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { secureStoreAdapter } from '@/utils/storage';
import { Config } from '@/constants/config';
import type { WorkspaceSession } from '@/types/auth';
import type { Workspace, WorkspaceState } from '@/types/workspace';

interface WorkspaceStore extends WorkspaceState {
  setCurrentWorkspace: (session: WorkspaceSession | null) => void;
  setWorkspaceList: (list: Workspace[]) => void;
  clearWorkspace: () => void;
}

const initialState: WorkspaceState = {
  currentWorkspace: null,
  workspaceList: [],
};

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentWorkspace: (session) => set({ currentWorkspace: session }),
      setWorkspaceList: (list) => set({ workspaceList: list }),
      clearWorkspace: () => set(initialState),
    }),
    {
      name: Config.workspaceStorageKey,
      storage: createJSONStorage(() => secureStoreAdapter),
    },
  ),
);
