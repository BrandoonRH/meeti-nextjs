"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
} from "@/src/shared/components/forms";
import {
  SignUpSchema,
  SignUpSchemaType,
} from "@/src/features/auth/schemas/authSchema";

import { signUpAction } from "../actions/auth.actions";
import toast from "react-hot-toast";
import FormError from "@/src/shared/components/forms/FormError";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    const {error, success} = await signUpAction(data);

    if(error) {
      toast.error(error)
    }
    if(success) {
      toast.success(success)
      reset()
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="name">Nombre</FormLabel>
      <FormInput
        id="name"
        type="text"
        placeholder="Ingresa tu Nombre"
        {...register("name")}
      />

      {errors.name && <FormError>{errors.name.message}</FormError>}

      <FormLabel htmlFor="email">E-mail</FormLabel>
      <FormInput
        type="email"
        id="email"
        placeholder="Ingresa tu email"
        {...register("email")}
      />

      {errors.email && <FormError>{errors.email.message}</FormError>}

      <FormLabel htmlFor="password">Contraseña</FormLabel>
      <FormInput
        id="password"
        type="password"
        placeholder="Password - Min. 8 Caracteres"
        {...register("password")}
      />

      {errors.password && <FormError>{errors.password.message}</FormError>}

      <FormLabel htmlFor="password_confirmation">Repetir Contraseña</FormLabel>
      <FormInput
        id="password_confirmation"
        type="password"
        placeholder="Repite tu contraseña"
        {...register("password_confirmation")}
      />
      {errors.password_confirmation && (
        <FormError>{errors.password_confirmation.message}</FormError>
      )}

      <FormSubmit value="Crear Cuenta" className="mt-4"/>
    </Form>
  );
}
