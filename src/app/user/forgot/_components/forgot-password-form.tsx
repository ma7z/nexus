"use client"

import { useState } from "react"
import { forgotPasswordAction } from "../actions"
import { NexusLogo } from "@/components/system/nexus-logo"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react"
import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const goToLogin = () => {
    router.push("/user/signin")
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email) {
      setError("Email is required")
      return
    }

    setLoading(true)
    setError(null)

    try {
      await forgotPasswordAction(email)
      setSuccess(true)
    } catch {
      setError("Failed to send reset link")
    } finally {
      setLoading(false)
    }
  }


  if (success) {
    return (
      <div className="w-full max-w-sm space-y-4 rounded-xl border p-6 text-center">
        <div className="flex items-center">
          <Button className="absolute" variant='ghost' size='icon' onClick={(e) => {
            e.preventDefault()
            goToLogin()
          }}>
            <Icon icon={"iconamoon:arrow-left-1-thin"} className="size-3" />
          </Button>
          <NexusLogo className="items-center" />
        </div>
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Check your email</h1>
          <p className="text-sm text-muted-foreground">
            If the email exists, you will receive a reset link
          </p>
        </div>
      </div>
    )
  }


  return (
    <form

      onSubmit={onSubmit}
      className="w-full max-w-sm rounded-xl border p-6 space-y-4 items-center"
    >
      <div className="flex items-center">
        <Button className="absolute" variant='ghost' size='icon' onClick={(e) => {
          e.preventDefault()
          goToLogin()
        }}>
          <Icon icon={"iconamoon:arrow-left-1-thin"} className="size-3" />
        </Button>
        <NexusLogo className="items-center" />
      </div>

      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          Forgot password
        </h1>
        <p className="text-sm text-muted-foreground">
          Please input your email to get another password
        </p>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="fogot-error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      <Input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (error) setError(null)
        }}
        required
      />


      <Button
        type="submit"
        className="w-full"
        disabled={loading}

      >
        {loading ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  )
}
