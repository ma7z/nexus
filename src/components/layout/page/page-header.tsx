import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  centerActions?: ReactNode;
  endActions?: ReactNode
  className?: string;
}

function PageHeader({ title, centerActions, endActions, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center border-b px-4",
        className
      )}
    >
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex justify-center">{centerActions}</div>

      <div className="flex justify-end">
        {endActions}
      </div>
    </header>
  );
}

export default PageHeader;
