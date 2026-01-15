import { findUserRoleInWorkspace } from "../repositories/authorization.repository";

type RequiredRole = "ADMIN" | "MEMBER";

export async function authorizeWorkspaceAction(
  userId: string,
  workspaceId: string,
  requiredRole: RequiredRole
) {
  const membership = await findUserRoleInWorkspace(userId, workspaceId);

  if (!membership) {
    throw new Error("User is not part of this workspace");
  }

  if (requiredRole === "ADMIN" && membership.role !== "ADMIN") {
    throw new Error("Insufficient permissions");
  }

  return membership;
}
