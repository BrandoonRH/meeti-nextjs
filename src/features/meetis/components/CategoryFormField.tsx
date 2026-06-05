"use client";

import { FormLabel, FormSelect } from "@/src/shared/components/forms";
import { Suspense, use } from "react";
import { SelectCategory } from "../types/meeti.types";
import { useFormContext } from "react-hook-form";
import { MeetiInput } from "../schemas/meetiSchema";
import FormError from "@/src/shared/components/forms/FormError";

const categoriesPromise = fetch("/api/categories").then((res) => res.json());

function CategoryOptions() {
   const {
      register,
      formState: { errors },
    } = useFormContext<MeetiInput>();

  const categories = use<SelectCategory[]>(categoriesPromise);

  return (
    <>
      <FormLabel>Categoria Meeti</FormLabel>
      <FormSelect {...register('categoryId')}>
        <option value="">Selecciona Comunidad</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </FormSelect>
      {errors.categoryId && (
          <FormError>{errors.categoryId.message}</FormError>
        )}
    </>
  );
}

export default function CategoryFormField() {
  return (
    <Suspense fallback={"Cargando..."}>
      <CategoryOptions />
    </Suspense>
  );
}
