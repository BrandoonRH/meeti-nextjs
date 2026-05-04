"use client";

import {
  Form,
  FormInput,
  FormSubmit,
  FormLabel,
} from "@/src/shared/components/forms";

export default function LoginForm() {
  return (
    <Form>
      <FormLabel htmlFor="email" className="text-lg text-slate-600 ">E-mail</FormLabel>
      <FormInput type="email" id="email" placeholder="Ingresa tu email" />
      <FormLabel className="text-lg text-slate-600">Password</FormLabel>
      <FormInput
        type="password"
        id="password"
        placeholder="Ingresa tu contraseña"
      />
      <FormSubmit  value="Iniciar Sesión"/>
    </Form>
  );
}
