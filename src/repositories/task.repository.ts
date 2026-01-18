import { prisma } from "../lib/prisma";

export function createTask(data: {
  title: string;
  projectId: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
}) {
  return prisma.task.create({
    data,
  });
}

export function updateTask(
  taskId: string,
  data: {
    title?: string;
    status?: "OPEN" | "IN_PROGRESS" | "DONE";
    priority?: "LOW" | "MEDIUM" | "HIGH";
  }
) {
  return prisma.task.update({
    where: { id: taskId },
    data,
  });
}

export function deleteTask(taskId: string) {
  return prisma.task.delete({
    where: { id: taskId },
  });
}

export function findTaskWithProject(taskId: string) {
  return prisma.task.findUnique({
    where: { id: taskId },
    include: {
      project: {
        select: {
          id: true,
          name: true,
          workspaceId: true,
        },
      },
    },
  });
}

export function findTasksByWorkspace(workspaceId: string) {
  return prisma.task.findMany({
    where: {
      project: {
        workspaceId,
      },
    },
    include: {
      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export function findTasksByProject(projectId: string) {
  return prisma.task.findMany({
    where: { projectId },
    orderBy: {
      createdAt: "asc",
    },
  });
}
