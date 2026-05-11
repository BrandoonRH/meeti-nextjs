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
  new_password: z
    .string()
    .trim()
    .min(8, { error: "La contraseña debe tener al menos 8 caracteres" }),
});

export const SigInSchema = BaseAuthSchema.pick({
  email: true,
}).extend({
  password: z
    .string()
    .trim()
    .min(1, { error: "La contraseña no puede ir vacia" }),
});

export type SigInSchemaType = z.infer<typeof SigInSchema>;

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

export const ForgotPasswordSchema = BaseAuthSchema.pick({
  email: true,
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

export const SetPasswordSchema = BaseAuthSchema.pick({
  new_password: true,
  password_confirmation: true,
}).refine((data) => data.new_password === data.password_confirmation, {
  message: "Las contraseñas no coinciden",
  path: ["password_confirmation"],
});

export type SetPasswordInput = z.infer<typeof SetPasswordSchema>;
