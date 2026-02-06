import PageHeader from "@/components/layout/page/page-header";
import { WorkspaceStats } from "../_components/workspace-stats"
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { getWorkspace } from "@/lib/workspace/get-workspace";

export default async function WorkspacePage() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const workspace = await getWorkspace();

  if (!workspace) {
    return <div>No workspace found</div>;
  }

  return (
    <div className="flex flex-col">
      <PageHeader title={workspace.name.toUpperCase()} />
      <WorkspaceStats workspaceId={workspace.id} />
    </div>
  );
}
