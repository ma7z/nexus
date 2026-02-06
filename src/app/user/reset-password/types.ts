export type ResetPasswordState = {
  fieldErrors?: {
    password?: string[]
    confirmPassword?: string[]
  }
  formError?: string
  success?: boolean
}
