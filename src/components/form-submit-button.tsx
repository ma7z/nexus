"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { NexusLoading } from "@/components/system/nexus-loading"

type Props = {
  label: string
  pendingLabel?: string
}

export function FormSubmitButton({
  label,
  pendingLabel,
}: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="w-full"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <NexusLoading className="size-5" />
          {pendingLabel ?? label}
        </div>
      ) : (
        label
      )}
    </Button>
  )
}
