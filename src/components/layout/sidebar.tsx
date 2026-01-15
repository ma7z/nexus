"use client";

import { Icon } from "@iconify/react";

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
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ModeToggle } from "@/components/system/mode-toggle";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

// Tipo para os itens do menu
type MenuItem = {
  title: string;
  url: string;
  icon: string;
};

// Tipo para os grupos do sidebar
type MenuGroup = {
  label: string;
  items: MenuItem[];
};

// Grupos de menu com labels
const menuGroups: MenuGroup[] = [
  {
    label: "Menu",
    items: [
      {
        title: "Início",
        url: "/",
        icon: "iconamoon:home",
      },
      {
        title: "Agenda",
        url: "/agenda",
        icon: "iconamoon:calendar-1",
      },
      {
        title: "Pacientes",
        url: "/pacientes",
        icon: "iconamoon:profile",
      },
      {
        title: "Prontuários",
        url: "/prontuarios",
        icon: "iconamoon:search",
      },
    ],
  },
  {
    label: "Clínica",
    items: [
      {
        title: "Estoque",
        url: "/estoque",
        icon: "iconamoon:box",
      },
      {
        title: "Financeiro",
        url: "/financeiro",
        icon: "iconamoon:cheque",
      },
    ],
  },
  {
    label: "Configurações",
    items: [
      {
        title: "Perfil",
        url: "/perfil",
        icon: "iconamoon:profile",
      },
      {
        title: "Informações",
        url: "/informacoes",
        icon: "iconamoon:settings",
      },
    ],
  },
];

const person = {
  avatar: "https://github.com/shadcn.png",
  username: "Mateus Augusto",
  email: "Esteticista",
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="flex flex-row items-center justify-between overflow-x-hidden  w-full pt-8 pb-6 pl-4 group-data-[collapsible=icon]:pl-2.5 transition-[width] duration-200 ease-linear">
        <div className="flex w-full justify-between transition-colors items-center">
          <h1 className="font-extrabold group-data-[collapsible=icon]:hidden">
            NEXUS<span className="font-thin">™</span>
          </h1>
          <div className="flex group-data-[collapsible=icon]:flex-col gap-y-2 items-center">
            <h1 className="opacity-0 group-data-[collapsible=icon]:opacity-100 transition-colors px-2 font-bold text-xs py-1 text-background bg-blue-400 rounded-full">
              N
            </h1>
            <ModeToggle />
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="uppercase font-bold text-xs">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="rounded-3xl pl-2 font-medium h-9 transition-colors hover:brightness-110"
                      asChild
                      tooltip={item.title}
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

      <SidebarFooter className="flex flex-row w-full">
        <Item
          variant="outline"
          className="flex flex-row flex-nowrap w-full cursor-pointer rounded-3xl py-3.5 px-2 items-center gap-x-2 hover:bg-sidebar-accent group-data-[collapsible=icon]:hidden"
        >
          <ItemMedia>
            <Avatar className="size-8">
              <AvatarImage src={person.avatar} className="grayscale" />
              <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent className="text-sm">
            <ItemTitle className="leading-3">{person.username}</ItemTitle>
            <ItemDescription className="leading-3 truncate max-w-30">
              {person.email}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer"
            >
              <Icon icon="solar:logout-2-broken" className="size-4" />
            </Button>
          </ItemActions>
        </Item>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="group-data-[collapsible=icon]:flex hidden h-auto w-full justify-center p-2 hover:bg-sidebar-accent rounded-md"
            >
              <Avatar>
                <AvatarImage src={person.avatar} className="grayscale" />
                <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {person.username}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {person.email}
                </p>
              </div>
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
            <DropdownMenuItem >
              <Icon icon="solar:logout-2-broken" className="size-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
