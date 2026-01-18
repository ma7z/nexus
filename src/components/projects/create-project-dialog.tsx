"use client"

import { useState } from "react"
import { useWorkspaceStore } from "@/store/use-workspace-store"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import CreateProjectForm from "./create-project-form"

export default function CreateProjectDialog() {
  const role = useWorkspaceStore(state => state.user?.role)
  const [open, setOpen] = useState(false)

  if (role !== "ADMIN") {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create project</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
        </DialogHeader>

        <CreateProjectForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
