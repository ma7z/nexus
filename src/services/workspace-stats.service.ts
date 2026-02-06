import { getWorkspaceStats } from "@/repositories/workspace-stats.repository";

export async function getWorkspaceStatsService(workspaceId: string) {
  const [projects, members, tasks] =
    await getWorkspaceStats(workspaceId);

  return {
    projects,
    members,
    tasks,
  };
}
