"use client"

import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { NexusLogo } from "@/components/system/nexus-logo"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import type { ResetPasswordState } from "../types"
import { resetPasswordAction } from "../actions"
import { FormSubmitButton } from "@/components/form-submit-button"

const initialState: ResetPasswordState = {}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction] = useActionState<
    ResetPasswordState,
    FormData
  >(resetPasswordAction, initialState)

  if (state.success) {
    return (
      <div className="w-full max-w-sm rounded-xl border bg-background p-6 text-center shadow-sm space-y-3">
        <NexusLogo className="items-center" />
        <h1 className="text-lg font-semibold tracking-tight">
          Password updated
        </h1>
        <p className="text-sm text-muted-foreground">
          You can now sign in with your new password
        </p>

        <Link href="/user/signin" className="font-medium hover:underline">
          Go to Login
        </Link>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      noValidate
      className="w-full max-w-sm rounded-xl border bg-background p-6 shadow-sm space-y-6"
    >
      <input type="hidden" name="token" value={token} />

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
        {state.formError && (
          <motion.div
            key="reset-error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {state.formError}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <div>
          <Input
            type="password"
            name="password"
            placeholder="New password"
          />
          {state.fieldErrors?.password && (
            <p className="text-xs text-destructive">
              {state.fieldErrors.password[0]}
            </p>
          )}
        </div>

        <div>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
          />
          {state.fieldErrors?.confirmPassword && (
            <p className="text-xs text-destructive">
              {state.fieldErrors.confirmPassword[0]}
            </p>
          )}
        </div>
      </div>
      <FormSubmitButton
        label="Update password"
        pendingLabel="Updating password"
      />

    </form>
  )
}
