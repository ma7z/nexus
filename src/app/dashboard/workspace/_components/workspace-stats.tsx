import { getWorkspaceStatsService } from "@/services/workspace-stats.service";

export async function WorkspaceStats({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const stats = await getWorkspaceStatsService(workspaceId);

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Projects" value={stats.projects} />
      <StatCard label="Members" value={stats.members} />
      <StatCard label="Tasks" value={stats.tasks} />
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded border p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}
