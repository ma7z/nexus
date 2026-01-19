import { loginAction } from "./actions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export const runtime = "nodejs";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form action={loginAction} className="w-full max-w-sm space-y-4">
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Password" required />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  )
}
