// app/(auth)/layout.tsx
export const runtime = "nodejs";

import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return children;
}
