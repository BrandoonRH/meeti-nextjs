import { FormLabel, FormSelect } from "@/src/shared/components/forms";
import { Suspense, use } from "react";
import { useFormContext } from "react-hook-form";
import { MeetiInput } from "../schemas/meetiSchema";
import FormError from "@/src/shared/components/forms/FormError";

const communitiesPromise = fetch("/api/user/communities").then((res) =>
  res.json(),
);

function CommunityOpciones() {
  const {
    register,
    formState: { errors },
  } = useFormContext<MeetiInput>();
  const communities = use<{ id: string; name: string }[]>(communitiesPromise);

  return (
    <>
      <FormLabel>Comunidad Meeti</FormLabel>
      <FormSelect {...register("communityId")}>
        <option value="">Selecciona Comunidad</option>
        {communities.map((community) => (
          <option key={community.id} value={community.id}>
            {community.name}
          </option>
        ))}
      </FormSelect>
      {errors.communityId && (
        <FormError>{errors.communityId.message}</FormError>
      )}
    </>
  );
}

export default function CommunityFormField() {
  return (
    <Suspense fallback={"Cargando..."}>
      <CommunityOpciones />
    </Suspense>
  );
}
