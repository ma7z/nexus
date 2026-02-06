"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signupActions } from "./actions"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"
import { NexusLogo } from "@/components/system/nexus-logo"


export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSignup(formData: FormData) {
    const signup = await signupActions(formData)
    setError(null)

    try {
      await signupActions(formData)
    } catch {
      setError(signup?.error)
    }
  }

  const goToLogin = () => {
    router.push("/user/signin")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <form
        action={handleSignup}
        className="w-full max-w-sm space-y-6 rounded-xl border bg-background p-6 shadow-sm"
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
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Start organizing projects and tasks
          </p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="signup-error"
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

        <div className="space-y-2">
          <Input name="name" placeholder="Name" required />
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
        </div>

        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>
    </div>
  )
}
