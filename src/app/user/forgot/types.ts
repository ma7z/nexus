export type ForgotPasswordState = {
  fieldErrors?: {
    email?: string[]
  }
  formError?: string
  success?: boolean
  values?: {
    email?: string
  }
}
