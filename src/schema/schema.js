import { z } from "zod";

const CreateUserSchema = z.object({
  name: z
    .string("Name must be a string")
    .min(3, "Name must be at least 3 characters"),
  email: z.string("Email must be a string").email("Invalid email address"), //regex
});

const UpdateUserSchema = z.object({
  name: z
    .string("Name must be a string")
    .min(3, "Name must be at least 3 characters")
    .optional(),
  email: z
    .string("Email must be a string")
    .email("Invalid email address")
    .optional(),
});

export { CreateUserSchema, UpdateUserSchema };
