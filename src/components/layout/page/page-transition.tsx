import { Suspense } from "react";
import PageLoading from "./page-loading";

interface PageTransitionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PageTransition({ children, fallback }: PageTransitionProps) {
  return <Suspense fallback={fallback ?? <PageLoading />}>{children}</Suspense>;
}
