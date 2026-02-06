"use client"

import { useState } from "react"
import { resetPasswordAction } from "../action"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NexusLogo } from "@/components/system/nexus-logo"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { NexusLoading } from "@/components/system/nexus-loading"

export function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await resetPasswordAction(token, password)
      setSuccess(true)
    } catch {
      setError("Invalid or expired reset link")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-sm rounded-xl border bg-background p-6 text-center shadow-sm space-y-3">
        <NexusLogo className="items-center" />
        <h1 className="text-lg font-semibold tracking-tight">
          Password updated
        </h1>
        <p className="text-sm text-muted-foreground">
          You can now sign in with your new password
        </p>

        <Link href="/user/signin">Go to Login</Link>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm rounded-xl border bg-background p-6 shadow-sm space-y-6"
    >
      <div className="flex flex-col items-center space-y-2 text-center">
        <NexusLogo className="items-center" />
        <h1 className="text-lg font-semibold tracking-tight">
          Reset password
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose a new password for your account
        </p>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="reset-error"
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

      <div className="space-y-3">
        <Input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <NexusLoading className="size-5" /> : "Update password"}
      </Button>
    </form>
  )
}
