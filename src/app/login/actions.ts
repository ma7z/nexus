"use server";

import { login } from "@/auth/auth.actions";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  await login(email, password);

  redirect("/dashboard");
}
