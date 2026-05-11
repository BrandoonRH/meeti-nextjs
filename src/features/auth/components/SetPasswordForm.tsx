"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
} from "@/src/shared/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetPasswordInput, SetPasswordSchema } from "../schemas/authSchema";
import FormError from "@/src/shared/components/forms/FormError";
import { redirect, useSearchParams } from "next/navigation";
import { setPasswordAction } from "../actions/auth.actions";
import toast from "react-hot-toast";

export default function SetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  if (!token) redirect("/auth/forgot-password");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(SetPasswordSchema),
    mode: "all",
  });

  const onSubmit = async (data: SetPasswordInput) => {
    const { error, success } = await setPasswordAction(data, token);
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
      redirect("/auth/login");
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel>Nueva contraseña</FormLabel>
      <FormInput
        type="password"
        id="new_password"
        placeholder="Ingresa tu nueva contraseña"
        {...register("new_password")}
      />
      {errors.new_password && (
        <FormError>{errors.new_password.message}</FormError>
      )}
      <FormLabel>Repite la contraseña</FormLabel>
      <FormInput
        type="password"
        id="password_confirmation"
        placeholder="Repite tu nueva contraseña"
        {...register("password_confirmation")}
      />
      {errors.password_confirmation && (
        <FormError>{errors.password_confirmation.message}</FormError>
      )}
      <FormSubmit value="Guardar" className="mt-5" />
    </Form>
  );
}
