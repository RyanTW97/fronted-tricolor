import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Debe ser un correo electrónico válido." })
    .min(1, { message: "El correo electrónico es obligatorio." }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
    .max(32, { message: "La contraseña no puede exceder los 32 caracteres." }),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es obligatorio." })
    .max(32, { message: "El nombre no puede exceder los 32 caracteres." }),
  email: z
    .string()
    .email({ message: "Debe ser un correo electrónico válido." })
    .min(1, { message: "El correo electrónico es obligatorio." }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
    .max(32, { message: "La contraseña no puede exceder los 32 caracteres." }),
});
