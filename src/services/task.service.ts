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

type TaskPriority = "LOW" | "MEDIUM" | "HIGH"

type CreateTaskInput = {
  title: string
  projectId: string
  workspaceId: string
  userId: string
  priority: TaskPriority
}

export async function createTaskService(input: CreateTaskInput) {
  const { title, projectId, workspaceId, userId, priority } = input
  console.log('creating task,', workspaceId, projectId, priority, userId, title)
  if (!title || title.trim().length < 3) {
    throw new Error("Invalid task title")
  }

  await authorizeWorkspaceAction(userId, workspaceId, "MEMBER")

  const task = await createTask({
    title,
    projectId,
    completed: false,
    priority,
  })

  await logAuditEvent({
    userId,
    action: "CREATE_TASK",
    entity: "Task",
    entityId: task.id,
  })

  return task
}


type UpdateTaskInput = {
  taskId: string;
  title: string;
  completed: boolean;
  status: string;
  userId: string;
};

export async function updateTaskService(input: UpdateTaskInput) {
  const { taskId, title, completed, status, userId } = input;

  const task = await findTaskWithProject(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  await authorizeWorkspaceAction(userId, task.project.workspaceId, "MEMBER");

  // 'priority' is not provided in UpdateTaskInput or in scope, so remove it
  // 'status' should likely be limited to allowed TaskStatus types
  const updated = await updateTask(taskId, { status: status as "OPEN" | "IN_PROGRESS" | "DONE" | undefined, title });

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
