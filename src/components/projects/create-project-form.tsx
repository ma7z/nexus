"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  onSuccess: () => void
}

export default function CreateProjectForm({ onSuccess }: Props) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim()) return

    setLoading(true)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
        credentials: "include",
      }
    )

    setLoading(false)

    if (!res.ok) {
      return
    }

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
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </Button>
    </form>
  )
}
