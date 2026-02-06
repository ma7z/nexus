import { resetPassword } from "@/services/reset-password.service"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { token, password } = await req.json()

  await resetPassword(token, password)

  return NextResponse.json({ success: true })
}
