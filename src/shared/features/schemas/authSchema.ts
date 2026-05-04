import { z } from "zod";

export const BaseAuthSchema = z.object({
  name: z.string().trim().min(1, { error: "El nombre es requerido" }),
  email: z.email({ error: "El email no es válido" }),
  password: z
    .string()
    .trim()
    .min(8, { error: "La contraseña debe tener al menos 8 caracteres" }),
  password_confirmation: z
    .string()
    .trim()
    .min(1, { error: "La confirmación de contraseña no puede estar vacio" }),
});

export const SignUpSchema = BaseAuthSchema.pick({
  name: true,
  email: true,
  password: true,
  password_confirmation: true,
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no coinciden",
  path: ["password_confirmation"],
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
