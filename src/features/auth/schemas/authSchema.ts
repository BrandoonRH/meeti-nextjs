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
    current_password: z.string().trim().min(1, { error: "El Password no puede ir vacio" }),
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

export const CheckPasswordSchema = z.object({
  password: z.string().min(1, "El password no puede ir vacio"),
});

export type CheckPasswordInput = z.infer<typeof CheckPasswordSchema>;

export const UpdatePasswordSchema = BaseAuthSchema.pick({
  current_password: true,
  new_password: true,
  password_confirmation: true
}).extend({
  revoke_other_sessions: z.boolean(),
}).refine(data => data.new_password === data.password_confirmation, {
  error: 'Los passwords no son iguales',
  path: ["password_confirmation"]
});
export type UpdatePasswordInput = z.infer<typeof UpdatePasswordSchema>; 
