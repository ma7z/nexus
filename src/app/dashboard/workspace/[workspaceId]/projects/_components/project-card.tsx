import Link from "next/link";

export function ProjectCard({
  project,
  workspaceSlug,
}: {
  project: {
    id: string;
    name: string;
    description: string | null;
  };
  workspaceSlug: string;
}) {
  return (
    <Link
      href={`/workspace/${workspaceSlug}/projects/${project.id}`}
      className="block rounded border p-4 hover:bg-muted"
    >
      <div className="font-medium">{project.name}</div>

      {project.description && (
        <div className="mt-1 text-sm text-muted-foreground">
          {project.description}
        </div>
      )}
    </Link>
  );
}
