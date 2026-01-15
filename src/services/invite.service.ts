import crypto from "crypto";
import { prisma } from "../lib/prisma";

import { logAuditEvent } from "./audit.service";
import { authorizeWorkspaceAction } from "./authorization.service";
import {
  createInvite,
  deleteInvite,
  findInviteByToken,
} from "../repositories/invite.repository";

export async function inviteUserToWorkspace(
  userId: string,
  workspaceId: string,
  email: string
) {
  await authorizeWorkspaceAction(userId, workspaceId, "ADMIN");

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const invite = await createInvite(
    email,
    workspaceId,
    "MEMBER",
    token,
    expiresAt
  );

  await logAuditEvent({
    userId,
    action: "CREATE_INVITE",
    entity: "Invite",
    entityId: invite.id,
  });

  return invite;
}

export async function acceptInvite(token: string, userId: string) {
  const invite = await findInviteByToken(token);

  if (!invite) {
    throw new Error("Invalid invite");
  }

  if (invite.expiresAt < new Date()) {
    throw new Error("Invite expired");
  }

  await prisma.workspaceMember.create({
    data: {
      userId,
      workspaceId: invite.workspaceId,
      role: invite.role,
    },
  });

  await logAuditEvent({
    userId,
    action: "ACCEPT_INVITE",
    entity: "Workspace",
    entityId: invite.workspaceId,
  });

  await deleteInvite(invite.id);

  return true;
}
