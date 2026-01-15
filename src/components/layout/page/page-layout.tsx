import { cn } from "@/lib/utils";
import { PageTransition } from "./page-transition";

interface PageLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className="flex h-full flex-col overflow-x-hidden">
      <main
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden p-3",
          className
        )}
      >
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
