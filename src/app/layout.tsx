import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Manrope } from "next/font/google";

import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Providers } from "./(app)/providers";
import { ThemeProvider } from "@/components/system/theme-provider";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { AppSidebarServer } from "@/components/layout/sidebar/app-sidebar.server";

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus",
  description: "The best system for your business",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={manropeSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {user ? (
            <SidebarProvider>
              <AppSidebarServer />
              <SidebarInset className="overflow-x-hidden">
                <Providers>{children}</Providers>
              </SidebarInset>
            </SidebarProvider>
          ) : (
            <Providers>{children}</Providers>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
