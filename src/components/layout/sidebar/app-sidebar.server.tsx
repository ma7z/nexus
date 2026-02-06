import { getCurrentUser } from "@/lib/auth/get-current-user"
import { getWorkspace } from "@/lib/workspace/get-workspace"
import { AppSidebarClient } from "./app-sidebar.client"

export type MenuItem = {
  title: string
  url: string
  icon: string
}

export type MenuGroup = {
  label: string
  items: MenuItem[]
}

function getMenuGroups(workspaceId: string): MenuGroup[] {
  return [
    {
      label: "Menu",
      items: [
        { title: "Início", url: "/dashboard", icon: "iconamoon:home" },
        {
          title: "Workspace",
          url: `/dashboard/workspace/${workspaceId}`,
          icon: "iconamoon:3d",
        },
        {
          title: "Projetos",
          url: `/dashboard/workspace/${workspaceId}/projects`,
          icon: "iconamoon:box",
        },
        {
          title: "Tasks",
          url: `/dashboard/workspace/${workspaceId}/tasks`,
          icon: "iconamoon:calendar-1",
        },
      ],
    },
  ]
}

export async function AppSidebarServer() {
  const user = await getCurrentUser()
  if (!user) return null

  const workspace = await getWorkspace(user.id)
  if (!workspace) return null

  return (
    <AppSidebarClient
      user={user}
      workspace={workspace}
      menuGroups={getMenuGroups(workspace.id)}
    />
  )
}
