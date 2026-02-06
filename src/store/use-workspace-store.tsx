import { create } from "zustand"

type User = {
  id: string
  email: string
  username?: string
  avatar?: string
  role?: string
}

type Workspace = {
  id: string
  name: string
  slug: string
}

type WorkspaceState = {
  user: User | null
  workspace: Workspace | null
  setWorkspace: (data: { user: User; workspace: Workspace }) => void
  clear: () => void
}

export const useWorkspaceStore = create<WorkspaceState>(set => ({
  user: null,
  workspace: null,

  setWorkspace: ({ user, workspace }) =>
    set({
      user,
      workspace,
    }),

  clear: () =>
    set({
      user: null,
      workspace: null,
    }),
}))
