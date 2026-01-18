export async function getWorkspace(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/workspaces/current`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}
