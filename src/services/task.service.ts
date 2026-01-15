import { findProjectById } from "../repositories/project.repository";
import {
  createTask,
  deleteTask,
  findTasksByProject,
  findTaskWithProject,
  updateTask,
} from "../repositories/task.repository";
import { logAuditEvent } from "./audit.service";
import { authorizeWorkspaceAction } from "./authorization.service";

type CreateTaskInput = {
  title: string;
  projectId: string;
  workspaceId: string;
  userId: string;
};

export async function createTaskService(input: CreateTaskInput) {
  const { title, projectId, workspaceId, userId } = input;

  if (!title || title.trim().length < 3) {
    throw new Error("Invalid task title");
  }

  await authorizeWorkspaceAction(userId, workspaceId, "MEMBER");

  const task = await createTask(title, projectId);

  await logAuditEvent({
    userId,
    action: "CREATE_TASK",
    entity: "Task",
    entityId: task.id,
  });

  return task;
}

type UpdateTaskInput = {
  taskId: string;
  title: string;
  completed: boolean;
  userId: string;
};

export async function updateTaskService(input: UpdateTaskInput) {
  const { taskId, title, completed, userId } = input;

  const task = await findTaskWithProject(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  await authorizeWorkspaceAction(userId, task.project.workspaceId, "MEMBER");

  const updated = await updateTask(taskId, title, completed);

  await logAuditEvent({
    userId,
    action: "UPDATE_TASK",
    entity: "Task",
    entityId: taskId,
  });

  return updated;
}

type DeleteTaskInput = {
  taskId: string;
  userId: string;
};

export async function deleteTaskService(input: DeleteTaskInput) {
  const { taskId, userId } = input;

  const task = await findTaskWithProject(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  await authorizeWorkspaceAction(userId, task.project.workspaceId, "ADMIN");

  await deleteTask(taskId);

  await logAuditEvent({
    userId,
    action: "DELETE_TASK",
    entity: "Task",
    entityId: taskId,
  });

  return true;
}

export async function listTasksService(userId: string, projectId: string) {
  const project = await findProjectById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  await authorizeWorkspaceAction(userId, project.workspaceId, "MEMBER");

  return findTasksByProject(projectId);
}
