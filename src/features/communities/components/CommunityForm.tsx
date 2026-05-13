import {
  FormInput,
  FormLabel,
  FormTextArea,
} from "@/src/shared/components/forms";
import { useFormContext } from "react-hook-form";
import { CommunityInput } from "../schemas/communitySchema";
import FormError from "@/src/shared/components/forms/FormError";
import UploadImage from "@/src/shared/components/upload/UploadImage";

export default function CommunityForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CommunityInput>(); //? 📄 https://react-hook-form.com/docs/useformcontext
  return (
    <>
      <FormLabel>Nombre Comunidad</FormLabel>
      <FormInput
        id="name"
        type="text"
        placeholder="Titulo Comunidad"
        {...register("name")}
      />
      {errors.name && <FormError>{errors.name.message}</FormError>}

      <FormLabel>Imagen Comunidad</FormLabel>
      <UploadImage />

      <FormLabel>Descripción Comunidad</FormLabel>
      <FormTextArea
        id="description"
        placeholder="Descripción Comunidad"
        {...register("description")}
      />
      {errors.description && (
        <FormError>{errors.description.message}</FormError>
      )}
    </>
  );
}
