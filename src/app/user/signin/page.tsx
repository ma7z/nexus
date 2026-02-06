"use client"

import { useActionState } from "react"
import { loginActions } from "./actions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { NexusLogo } from "@/components/system/nexus-logo"

const authMessages = {
  EMAIL_NOT_FOUND: "Email not found",
  INVALID_PASSWORD: "Invalid password",
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginActions, {})

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-xl border bg-background p-6 shadow-sm space-y-6"
      >
        <NexusLogo className="items-center" />

        <AnimatePresence mode="wait">
          {state?.authError && (
            <motion.div
              key="auth-error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {authMessages[state.authError as keyof typeof authMessages] ?? "An unknown error occurred"}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-1">
          <Input name="email" type="email" placeholder="Email" />
          {state?.formErrors?.email && (
            <p className="text-xs text-destructive">
              {state.formErrors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Input name="password" type="password" placeholder="Password" />
          {state?.formErrors?.password && (
            <p className="text-xs text-destructive">
              {state.formErrors.password[0]}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>

        <div className="flex flex-col gap-2 text-center text-sm">
          <Link href="/user/forgot" className="text-muted-foreground hover:text-foreground transition">
            Forgot your password?
          </Link>
          <Link href="/user/signup" className="font-medium hover:underline">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  )
}
