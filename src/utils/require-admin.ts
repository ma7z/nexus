export function requireAdmin(role: "ADMIN" | "MEMBER") {
  if (role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }
}
