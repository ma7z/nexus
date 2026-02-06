"use client"

import { useActionState } from "react"
import { loginActions } from "./actions"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { NexusLogo } from "@/components/system/nexus-logo"
import { useFormStatus } from "react-dom"
import type { LoginState } from "./types"
import { FormSubmitButton } from "@/components/form-submit-button"

const initialState = {}

export default function LoginPage() {
  const { pending } = useFormStatus()
  const [state, formAction] = useActionState<LoginState, FormData>(
    loginActions,
    initialState
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <form
        noValidate
        action={formAction}
        className="w-full max-w-sm rounded-xl border bg-background p-6 shadow-sm space-y-6"
      >
        <NexusLogo className="items-center" />

        <AnimatePresence mode="wait">
          {state?.formError && (
            <motion.div
              key="form-error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {state.formError}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          <Input defaultValue={state?.values?.email} disabled={pending} name="email" type="email" placeholder="Email" />
          {state?.fieldErrors?.email && (
            <p className="text-xs text-destructive">
              {state.fieldErrors.email[0]}
            </p>
          )}


          <Input disabled={pending} name="password" type="password" placeholder="Password" />
          {state?.fieldErrors?.password && (
            <p className="text-xs text-destructive">
              {state.fieldErrors.password[0]}
            </p>
          )}
        </div>

        <FormSubmitButton
          label="Sign in"
          pendingLabel="Signing in"
        />

        <div className="flex flex-col gap-2 text-center text-sm">
          <Link
            href="/user/forgot"
            className="text-muted-foreground hover:text-foreground transition"
          >
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
