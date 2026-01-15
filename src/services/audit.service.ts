import { prisma } from "../lib/prisma";

type AuditInput = {
  userId: string;
  action: string;
  entity: string;
  entityId: string;
};

export function logAuditEvent(input: AuditInput) {
  return prisma.auditLog.create({
    data: input,
  });
}
