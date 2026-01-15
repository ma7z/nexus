import { prisma } from "../lib/prisma";

export function createTask(title: string, projectId: string) {
  return prisma.task.create({
    data: {
      title,
      projectId,
    },
  });
}

export function updateTask(taskId: string, title: string, completed: boolean) {
  return prisma.task.update({
    where: { id: taskId },
    data: {
      title,
      completed,
    },
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
      project: true,
    },
  });
}

export function findTasksByProject(projectId: string) {
  return prisma.task.findMany({
    where: { projectId },
    orderBy: { createdAt: "asc" },
  });
}
