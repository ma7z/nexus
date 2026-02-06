"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import CreateTaskForm from "./create-task-form"
import { getProjects } from "@/lib/projects/get-projects"

type Projects = Awaited<ReturnType<typeof getProjects>>

type Props = {
  workspaceId: string
  projects: Projects
}

export default function CreateTaskDialogClient({
  workspaceId,
  projects,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Create task</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
        </DialogHeader>

        <CreateTaskForm
          projects={projects}
          workspaceId={workspaceId}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
