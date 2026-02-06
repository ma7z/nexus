import { getCurrentUser } from "@/lib/auth/get-current-user"
import { getWorkspace } from "@/lib/workspace/get-workspace"
import { findUserRoleInWorkspace } from "@/repositories/authorization.repository"
import CreateProjectDialogClient from "./create-project-dialog.client"

export default async function CreateProjectDialogServer() {
  const user = await getCurrentUser();
  const workspace = await getWorkspace();

  if (!user || !workspace) {
    return null;
  }

  const roleRecord = await findUserRoleInWorkspace(user.id, workspace.id)
  if (!roleRecord || roleRecord.role !== "ADMIN") return null


  return (
    <CreateProjectDialogClient workspaceId={workspace.id} />
  )
}
