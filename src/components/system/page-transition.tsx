"use client";

import { AnimatePresence } from "framer-motion";
import { FadeTransition } from "./fade-transition";
import Loading from "./loading";
import { usePageLoadingStore } from "@/store/use-page-loading-store";

type Props = {
  children: React.ReactNode;
};

export function PageTransition({ children }: Props) {
  const isLoading = usePageLoadingStore((s) => s.pending > 0);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <FadeTransition key="loading">
          <Loading />
        </FadeTransition>
      ) : (
        <FadeTransition key="content">{children}</FadeTransition>
      )}
    </AnimatePresence>
  );
}
