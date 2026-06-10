"use client";
import { FormProvider, useForm } from "react-hook-form";
import {
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
  FormTextArea,
} from "@/src/shared/components/forms";
import UploadImage from "@/src/shared/components/upload/UploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileInput, ProfileSchema } from "../schemas/ProfileSchema";
import FormError from "@/src/shared/components/forms/FormError";
import { User } from "../../auth/types";
import { profileService } from "../services/ProfileService";
import { updateProfileAction } from "../actions/profile.actions";
import toast from "react-hot-toast";

interface Props {
  user: User;
}

export default function ProfileForm({ user }: Props) {
  const methods = useForm({
    resolver: zodResolver(ProfileSchema),
    mode: "all",
    defaultValues: {
      name: user.name,
      bio: user.bio ?? "",
      image: user.image ?? "",
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  const handleUpdateProfile = async (data: ProfileInput) => {
    const { error, success } = await updateProfileAction(data);

    if (error) {
      toast.error(error);
      return;
    }

    if (success) {
      toast.success(success);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(handleUpdateProfile)}>
        <FormLabel htmlFor="name">Nombre:</FormLabel>
        <FormInput
          id="name"
          type="text"
          placeholder="Tu Nombre"
          {...register("name")}
        />
        {errors.name && <FormError>{errors.name.message}</FormError>}

        <FormLabel id="bio">Biografía</FormLabel>
        <FormTextArea
          id="bio"
          placeholder="Añade una Descripción o Biografía"
          {...register("bio")}
        />
        {errors.bio && <FormError>{errors.bio.message}</FormError>}

        <FormLabel>Imagen perfil</FormLabel>
        <UploadImage />

        <FormSubmit value={"Guardar Cambios"} />
      </Form>
    </FormProvider>
  );
}
