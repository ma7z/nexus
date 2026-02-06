"use client";

import { Badge } from "@/components/ui/badge";

type TaskRowProps = {
  task: any;
};

export function TaskRow({ task }: TaskRowProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="space-y-1">
        <p className="text-sm font-medium">{task.title}</p>
        <p className="text-xs text-muted-foreground">
          {task.project.name}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="secondary">{task.status}</Badge>
        <Badge>{task.priority}</Badge>
      </div>
    </div>
  );
}
