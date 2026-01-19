"use client";

import { useState, useMemo } from "react";
import { TaskRow } from "./task-row";
import { TaskFilters } from "./task-filters";

type TaskListProps = {
  tasks: any[];
  projects: any[];
};

export function TaskList({ tasks, projects }: TaskListProps) {
  const [status, setStatus] = useState("ALL");
  const [projectId, setProjectId] = useState("ALL");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (status !== "ALL" && task.status !== status) {
        return false;
      }

      if (projectId !== "ALL" && task.project.id !== projectId) {
        return false;
      }

      return true;
    });
  }, [tasks, status, projectId]);

  if (tasks.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No tasks created yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TaskFilters
        status={status}
        projectId={projectId}
        projects={projects}
        onStatusChange={setStatus}
        onProjectChange={setProjectId}
      />

      <div className="divide-y rounded-md border">
        {filteredTasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-sm text-muted-foreground">
          No tasks match the selected filters
        </div>
      )}
    </div>
  );
}
