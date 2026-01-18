import { cookies } from "next/headers";

export async function getProjects() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return [];
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}
