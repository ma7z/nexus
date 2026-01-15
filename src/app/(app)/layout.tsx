"use client";
import PageHeader from "@/components/layout/page/page-header";
import { PageLayout } from "@/components/layout/page/page-layout";
import { PageTransition } from "@/components/layout/page/page-transition";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "Início",
  "/agenda": "Agenda",
  "/pacientes": "Pacientes",
  "/financeiro": "Financeiro",
  "/prontuarios": "Prontuários",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "";

  return (
    <PageLayout>
      <PageTransition>{children}</PageTransition>
    </PageLayout>
  );
}
