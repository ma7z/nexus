"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  workspaceId: string
  onSuccess: () => void
}

export default function CreateProjectForm({ workspaceId, onSuccess }: Props) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)  



  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true) 

    console.log("tentando criar", name , "workspaceId", workspaceId)

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        workspaceId,
      }),
    })

      console.log(res)
    setLoading(false)

    if (!res.ok) return

    setName("")
    onSuccess()
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project name</Label>
        <Input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="My awesome project"
          disabled={loading}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating..." : "Create project"}
      </Button>
    </form>
  )
}
