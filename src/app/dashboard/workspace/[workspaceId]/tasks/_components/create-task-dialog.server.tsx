import { getCurrentUser } from "@/lib/auth/get-current-user"
import { getWorkspace } from "@/lib/workspace/get-workspace"
import { findUserRoleInWorkspace } from "@/repositories/authorization.repository"
import CreateTaskDialogClient from "./create-task-dialog.client"
import { getTasks } from "@/lib/tasks/get-tasks"
import { getProjects } from "@/lib/projects/get-projects"

export default async function CreateTaskDialogServer() {
  const user = await getCurrentUser()
  if (!user) return null
  const workspace = await getWorkspace(user.id)
  if (!workspace) return null

  const roleRecord = await findUserRoleInWorkspace(user.id, workspace.id)
  if (!roleRecord || roleRecord.role !== "ADMIN") return null

  const projects = await getProjects(workspace.id)

  return (
    <CreateTaskDialogClient workspaceId={workspace.id} projects={projects} />
  )
} 
