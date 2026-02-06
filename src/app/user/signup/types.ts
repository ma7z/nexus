export type SignupState = {
  fieldErrors?: {
    name?: string[]
    username?: string[]
    email?: string[]
    password?: string[]
  }
  formError?: string
  values?: {
    name?: string
    username?: string
    email?: string
  }
}
