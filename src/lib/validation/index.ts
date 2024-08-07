import { z } from "zod"

export const SignupValidationSchema = z.object({
    name: z.string().min(2, 'To short').max(15, 'To long'),
    username: z.string().min(2, 'To short').max(15, 'To long'),
    email: z.string().email('Must be email'),
    password: z.string().min(8, 'The password must contain 8 characters')
})