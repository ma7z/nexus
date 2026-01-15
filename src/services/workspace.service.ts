import {
  createWorkspaceWithOwner,
  findUserById,
} from "../repositories/workspace.repository";
import { logAuditEvent } from "./audit.service";

type CreateWorkspaceInput = {
  name: string;
  userId: string;
};

export async function createWorkspace(input: CreateWorkspaceInput) {
  const { name, userId } = input;

  if (!name || name.trim().length < 3) {
    throw new Error("Invalid workspace name");
  }

  const userExists = await findUserById(userId);

  if (!userExists) {
    throw new Error("User not found");
  }

  const workspace = await createWorkspaceWithOwner(name, userId);

  await logAuditEvent({
    userId,
    action: "CREATE_WORKSPACE",
    entity: "Workspace",
    entityId: workspace.id,
  });

  return workspace;
}
