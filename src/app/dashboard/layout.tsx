import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { getWorkspace } from "@/lib/workspace/get-workspace"
import WorkspaceInitializer from "@/components/providers/workspace-initializer"


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    redirect("/login")
  }

  const user = await getCurrentUser()
  const workspace = await getWorkspace()

  if (!user || !workspace) {
    redirect("/login")
  }

  return (
    <>
      <WorkspaceInitializer user={user} workspace={workspace} />


      {children}

    </>
  )
}
