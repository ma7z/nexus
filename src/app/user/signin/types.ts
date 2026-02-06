export type LoginState = {
  fieldErrors?: {
    email?: string[]
    password?: string[]
  }
  formError?: string,
  values?: {
    email?: string
  }
}