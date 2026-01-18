import PageHeader from "@/components/layout/page/page-header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  // const cookieStore = await cookies()
  // const token = cookieStore.get("token")?.value

  // if (!token) {
  //   redirect("/login")
  // }
  return (
    <>
      <PageHeader title="Início" />
      <span>hello</span>
    </>
  );
}
