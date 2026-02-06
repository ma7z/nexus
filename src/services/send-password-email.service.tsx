import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export function sendResetPasswordEmail({
  email,
  token
}: {
  email: string
  token: string
}) {
  const link = `${process.env.APP_URL}/user/reset-password?token=${token}`

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
