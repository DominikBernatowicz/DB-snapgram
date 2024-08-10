import { z } from "zod"

// AUTH
export const SignupValidationSchema = z.object({
    name: z.string().min(2, 'To short').max(15, 'To long'),
    username: z.string().min(2, 'To short').max(15, 'To long'),
    email: z.string().email('Must be email'),
    password: z.string().min(8, 'The password must contain 8 characters')
})

export const SigninValidationSchema = z.object({
    email: z.string().email('Must be email'),
    password: z.string().min(8, 'The password must contain 8 characters')
})

// POST
export const PostValidationSchema = z.object({
    caption: z.string()
        .min(5, "Caption must be at least 5 characters.")
        .max(2200, "Caption must be at most 2200 characters."),
    file: z.custom<File[]>(),
    location: z.string()
        .min(5, "Location must be at least 5 characters.")
        .max(100, "Location must be at most 100 characters."),
    tags: z.string(),
})