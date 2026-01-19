import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export async function getWorkspace() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return prisma.workspace.findFirst({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });
}
