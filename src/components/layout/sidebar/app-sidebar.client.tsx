"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { ModeToggle } from "@/components/system/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { signout } from "@/auth/auth.actions"
import type { MenuGroup } from "./app-sidebar.server"
import { redirect } from "next/navigation"
import { NexusLogo } from "@/components/system/nexus-logo"

type Props = {
  user: {
    id: string
    email: string
    username: string | null
    avatar: string | null
    password: string
    createdAt: Date
  }
  workspace: {
    id: string
    name: string
  }
  menuGroups: MenuGroup[]
}

export function AppSidebarClient({ user, workspace, menuGroups }: Props) {
  if (!workspace || !user) return null

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="flex flex-row items-center justify-between w-full pt-8 pb-6 pl-4 group-data-[collapsible=icon]:pl-2.5">
        <div className="flex w-full justify-between items-center">
  
          <NexusLogo className="group-data-[collapsible=icon]:hidden" />
          <div className="flex group-data-[collapsible=icon]:flex-col gap-y-2 items-center">
            <h1 className="opacity-0 group-data-[collapsible=icon]:opacity-100 px-2 font-bold text-xs py-1 text-background bg-blue-400 rounded-full">
              N
            </h1>
            <ModeToggle />
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {menuGroups.map(group => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="uppercase font-bold text-xs">
              {group.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className="rounded-3xl pl-2 font-medium h-9 hover:brightness-110"
                    >
                      <Link href={item.url}>
                        <Icon icon={item.icon} className="size-6" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="hidden group-data-[collapsible=icon]:hidden w-full">
          <div className="flex items-center gap-x-2 rounded-3xl px-2 py-3.5 hover:bg-sidebar-accent">
            <Avatar className="size-8">
              <AvatarImage src={user.avatar ?? undefined} className="grayscale" />
              <AvatarFallback>{user.username?.charAt(0) ?? "N"}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-sm truncate">
              <p className="font-medium leading-3">
                {user.username?.toUpperCase() ?? "NEX"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>

            {/* variant="ghost"
              className="group-data-[collapsible=icon]:hidden"
              onAction={signout}
              redirectTo="/user/signin"
              icon="solar:logout-2-broken"
            /> */}
          </div>


        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="hidden group-data-[collapsible=icon]:flex w-full justify-center p-2 rounded-md hover:bg-sidebar-accent"
            >
              <Avatar>
                <AvatarImage src={user.avatar ?? undefined} className="grayscale" />
                <AvatarFallback>{user.username?.charAt(0) ?? "N"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" side="right" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-medium">{user.username}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Icon icon="iconamoon:profile" className="size-4 mr-2" />
              Perfil
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Icon icon="iconamoon:settings" className="size-4 mr-2" />
              Configurações
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={async () => {
              await signout()
              redirect("/user/signin")
            }}>
              <Icon icon="solar:logout-2-broken" className="size-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="group-data-[collapsible=icon]:hidden w-full justify-start items-center px-2 py-8 rounded-3xl hover:bg-sidebar-accent"
            >
              <Avatar className="size-12">
                <AvatarImage src={user.avatar ?? undefined} className="grayscale" />
                <AvatarFallback>{user.username?.charAt(0) ?? "N"}</AvatarFallback>
              </Avatar>
              <DropdownMenuLabel className="space-y-1 px-0 justify-start items-center text-left">
                <p className="text-sm font-medium leading-none">{user.username}</p>
                <p className="text-xs text-muted-foreground ">{user.email}</p>
              </DropdownMenuLabel>

            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" side="right" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-medium">{user.username}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Icon icon="iconamoon:profile" className="size-4 mr-2" />
              Perfil
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Icon icon="iconamoon:settings" className="size-4 mr-2" />
              Configurações
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={async () => {
              await signout()
              redirect("/user/signin")
            }}>
              <Icon icon="solar:logout-2-broken" className="size-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
