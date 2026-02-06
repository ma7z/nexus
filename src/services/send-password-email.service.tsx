import { Resend } from "resend"

export function sendResetPasswordEmail({
  email,
  token
}: {
  email: string
  token: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  const appUrl = process.env.APP_URL

  if (!apiKey || !appUrl) {
    throw new Error("Missing email configuration")
  }

  const resend = new Resend(apiKey)

  const link = `${appUrl}/user/reset-password?token=${token}`

  return resend.emails.send({
    from: "Nexus <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: `
      <p>Click the link below to reset your password:</p>
      <a href="${link}">${link}</a>
    `
  })
}
