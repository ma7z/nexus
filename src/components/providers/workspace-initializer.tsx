"use client"

import { useWorkspaceStore } from "@/store/use-workspace-store"
import { useEffect } from "react"

export default function WorkspaceInitializer({
  user,
  workspace,
}: {
  user: any
  workspace: any
}) {
  const setWorkspace = useWorkspaceStore(state => state.setWorkspace)

  useEffect(() => {
    setWorkspace({ user, workspace })
  }, [user, workspace, setWorkspace])

  return null
}
