"use client"

import { useActionState } from "react"
import { signupActions } from "./actions"
import type { SignupState } from "./types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"
import { NexusLogo } from "@/components/system/nexus-logo"
import { useFormStatus } from "react-dom"
import { FormSubmitButton } from "@/components/form-submit-button"

const initialState: SignupState = {}

export default function SignupPage() {
  const router = useRouter()
  const { pending } = useFormStatus()
  const [state, formAction] = useActionState<
    SignupState,
    FormData
  >(signupActions, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <form
        action={formAction}
        noValidate
        className="w-full max-w-sm space-y-6 rounded-xl border bg-background p-6 shadow-sm"
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
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Start organizing projects and tasks
          </p>
        </div>

        <AnimatePresence mode="wait">
          {state.formError && (
            <motion.div
              key="signup-error"
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
          <div>
            <Input defaultValue={state.values?.username} disabled={pending} name="username" placeholder="Username" />
            {state.fieldErrors?.username && (
              <p className="text-xs text-destructive">
                {state.fieldErrors.username[0]}
              </p>
            )}
          </div>

          <div>
            <Input defaultValue={state.values?.name} disabled={pending} name="name" placeholder="Name" />
            {state.fieldErrors?.name && (
              <p className="text-xs text-destructive">
                {state.fieldErrors.name[0]}
              </p>
            )}
          </div>

          <div>
            <Input defaultValue={state.values?.email} disabled={pending} name="email" type="email" placeholder="Email" />
            {state.fieldErrors?.email && (
              <p className="text-xs text-destructive">
                {state.fieldErrors.email[0]}
              </p>
            )}
          </div>

          <div>
            <Input disabled={pending} name="password" type="password" placeholder="Password" />
            {state.fieldErrors?.password && (
              <p className="text-xs text-destructive">
                {state.fieldErrors.password[0]}
              </p>
            )}
          </div>
        </div>

        <FormSubmitButton
          label="Create account"
          pendingLabel="Creating account"
        />

      </form>
    </div>
  )
}
