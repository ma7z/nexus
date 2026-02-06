import { forgotPassword } from "@/services/forgot-password.service"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email } = await req.json()

  await forgotPassword(email)

  return NextResponse.json({
    message: "If the email exists, a reset link was sent."
  })
}
