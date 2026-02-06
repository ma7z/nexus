import { z } from "zod"

export const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9._-]+$/, "Username cannot contain spaces"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
})

export type SignupInput = z.infer<typeof signupSchema>
