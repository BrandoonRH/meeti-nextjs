"use client";

import Heading from "@/src/shared/components/typegraphy/Heading";
import {
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
} from "@/src/shared/components/forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdatePasswordInput,
  UpdatePasswordSchema,
} from "../schemas/authSchema";
import FormError from "@/src/shared/components/forms/FormError";
import { updatePasswordAction } from "../actions/auth.actions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
    mode: "all",
  });

  const handleChangePassword = async (data: UpdatePasswordInput) => {
    const { error, success } = await updatePasswordAction(data);
    if (error) toast.error(error);
    if (success) {
      toast.success(success);
      reset();
      redirect("/dashboard/security");
    }
  };
  return (
    <>
      <Heading level={2} className="mt-10">
        Cambiar Password
      </Heading>

      <div className="mt-10 p-5 border border-gray-200">
        <Form onSubmit={handleSubmit(handleChangePassword)}>
          <FormLabel htmlFor="currentPassword">Password Actual</FormLabel>
          <FormInput
            {...register("current_password")}
            id="currentPassword"
            type="password"
            placeholder="Escribe tu Password Actual"
          />
          {errors.current_password && (
            <FormError>{errors.current_password.message}</FormError>
          )}

          <FormLabel htmlFor="newPassword">Nuevo Password</FormLabel>
          <FormInput
            {...register("new_password")}
            id="newPassword"
            type="password"
            placeholder="Nuevo Password"
          />
          {errors.new_password && (
            <FormError>{errors.new_password.message}</FormError>
          )}

          <FormLabel htmlFor="passwordConfirmation">
            Repetir Nuevo Password
          </FormLabel>
          <FormInput
            {...register("password_confirmation")}
            id="passwordConfirmation"
            type="password"
            placeholder="Repite el Nuevo Password"
          />
          {errors.password_confirmation && (
            <FormError>{errors.password_confirmation.message}</FormError>
          )}

          <div className="flex gap-5 mt-5">
            <FormLabel htmlFor="revokeOtherSessions">
              Cerrar sesión en todos los dispositivos{" "}
            </FormLabel>

            <FormInput
              id="revokeOtherSessions"
              type="checkbox"
              className="accent-orange-500 p-6 size-5"
              {...register("revoke_other_sessions")}
            />
          </div>

          <FormSubmit value="Cambiar Password" />
        </Form>
      </div>
    </>
  );
}
