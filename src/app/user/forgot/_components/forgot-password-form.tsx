"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react"
import { AnimatePresence, motion } from "framer-motion"
import { NexusLogo } from "@/components/system/nexus-logo"
import { Button } from "@/components/ui/button"
import type { ForgotPasswordState } from "../types"
import { forgotPasswordFormAction } from "../actions"
import { Input } from "@/components/ui/input"
import { FormSubmitButton } from "@/components/form-submit-button"

const initialState: ForgotPasswordState = {}

export function ForgotPasswordForm() {
  const router = useRouter()

  const [state, formAction] = useActionState<
    ForgotPasswordState,
    FormData
  >(forgotPasswordFormAction, initialState)

  if (state.success) {
    return (
      <div className="w-full max-w-sm space-y-4 rounded-xl border p-6 text-center">
        <div className="flex items-center">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => router.push("/user/signin")}
          >
            <Icon icon="iconamoon:arrow-left-1-thin" className="size-3" />
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
      action={formAction}
      noValidate
      className="w-full max-w-sm rounded-xl border p-6 space-y-4"
    >
      <div className="flex items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => router.push("/user/signin")}
        >
          <Icon icon="iconamoon:arrow-left-1-thin" className="size-3" />
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
        {state.formError && (
          <motion.div
            key="forgot-error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {state.formError}
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <Input
          name="email"
          type="email"
          placeholder="Email address"
          defaultValue={state.values?.email}
        />
        {state.fieldErrors?.email && (
          <p className="text-xs text-destructive">
            {state.fieldErrors.email[0]}
          </p>
        )}
      </div>

      <FormSubmitButton
        label="Send reset link"
        pendingLabel="Sending..."
      />

    </form>
  )
}
