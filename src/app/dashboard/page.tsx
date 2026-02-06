"use client"

import PageHeader from "@/components/layout/page/page-header";
import { getWorkspace } from "@/lib/workspace/get-workspace";
import { useWorkspaceStore } from "@/store/use-workspace-store";


export default function Home() {
  const workspace = useWorkspaceStore(
    (state) => state.workspace
  )
  const user = useWorkspaceStore((state) => state.user)


  return (
    <>
      <h1>Aqui e a Dashboard</h1>
      <p></p>
    </>
  );
}
