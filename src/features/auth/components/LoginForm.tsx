"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormInput,
  FormSubmit,
  FormLabel,
} from "@/src/shared/components/forms";
import { SigInSchema, SigInSchemaType } from "../schemas/authSchema";
import FormError from "@/src/shared/components/forms/FormError";
import { signInAction } from "../actions/auth.actions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(SigInSchema),
    mode: "all",
  });

  const handleLogin = async (data: SigInSchemaType) => {
    const { error, success } = await signInAction(data);

    if (error) {
      return toast.error(error);
    }
    if (success) {
      toast.success(success);
      reset(); 
      redirect('/dashboard')
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleLogin)}>
      <FormLabel htmlFor="email" className="text-lg text-slate-600 ">
        E-mail
      </FormLabel>
      <FormInput
        type="email"
        id="email"
        placeholder="Ingresa tu email"
        {...register("email")}
      />
      {errors.email && (
        <FormError>{errors.email.message?.toString()}</FormError>
      )}
      <FormLabel className="text-lg text-slate-600">Password</FormLabel>
      <FormInput
        type="password"
        id="password"
        placeholder="Ingresa tu contraseña"
        {...register("password")}
      />
      {errors.password && (
        <FormError>{errors.password.message?.toString()}</FormError>
      )}
      <FormSubmit value="Iniciar Sesión" className="mt-4" />
    </Form>
  );
}
