import {
  createProject,
  findProjectsByWorkspace,
} from "../repositories/project.repository";
import { logAuditEvent } from "./audit.service";
import { authorizeWorkspaceAction } from "./authorization.service";

type CreateProjectInput = {
  name: string;
  workspaceId: string;
  userId: string;
};

export async function createProjectService(input: CreateProjectInput) {
  const { name, workspaceId, userId } = input;

  if (!name || name.trim().length < 3) {
    throw new Error("Invalid project name");
  }

  await authorizeWorkspaceAction(userId, workspaceId, "ADMIN");

  const project = await createProject(name, workspaceId);

  await logAuditEvent({
    userId,
    action: "CREATE_PROJECT",
    entity: "Project",
    entityId: project.id,
  });

  return project;
}

export async function listProjectsService(userId: string, workspaceId: string) {
  await authorizeWorkspaceAction(userId, workspaceId, "MEMBER");

  return findProjectsByWorkspace(workspaceId);
}
