import { object, string } from "zod";

export const loginSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  // .regex(
  //   /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]).{8,32}$/,
  //   "Password must contain at least one uppercase letter, one number, and one special character",
  // ),
});

export const registerSchema = object({
  username: string({ required_error: "Username is required" })
    .min(1, "Username is required")
    .max(32, "Username must be less than 32 characters")
    .regex(
      /^[a-z_]+$/,
      "Username must be lowercase and can only contain underscores",
    ),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]).{8,32}$/,
      "Password must contain at least one uppercase letter, one number, and one special character",
    ),
  re_password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]).{8,32}$/,
      "Password must contain at least one uppercase letter, one number, and one special character",
    ),
});

export const urlshortenerSchema = object({
  url: string({ required_error: "URL is required" })
    .url("Invalid URL")
    .min(1, "URL is required")
    .max(1000, "URL must be less than 1000 characters"),
});

export const urlSchema = object({
  url: string({ required_error: "URL is required" })
    .url("Invalid URL")
    .min(1, "URL is required")
    .max(1000, "URL must be less than 1000 characters"),
  group: string(),
  privacy: string(),
  password: string(),
  // .min(1, "Password is required")
  // .min(6, "Password must be more than 6 characters")
  // .max(32, "Password must be less than 32 characters")
  // .regex(
  //   /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]).{8,32}$/,
  //   "Password must contain at least one uppercase letter, one number, and one special character"
  // ),
});

export const domainSchema = object({
  domain: string({ required_error: "URL is required" })
    .url("Invalid URL")
    .min(1, "URL is required")
    .max(1000, "URL must be less than 1000 characters"),
});

export const groupSchema = object({
  name: string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  alias: string().max(10, "Alias must be less than 10 characters").optional(),
  description: string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
});

export const supportSchema = object({
  name: string({ required_error: "Password is required" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must not exceed 50 characters." }),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  message: string({ required_error: "Password is required" })
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(1000, { message: "Message must not exceed 1000 characters." }),
});

export const feedbackSchema = object({
  name: string({ required_error: "Password is required" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must not exceed 50 characters." }),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  message: string({ required_error: "Password is required" })
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(1000, { message: "Message must not exceed 1000 characters." }),
});
