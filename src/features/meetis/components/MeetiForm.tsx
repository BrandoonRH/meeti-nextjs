"use client";
import {
  FormInput,
  FormLabel,
  FormTextArea,
  FormToggle,
} from "@/src/shared/components/forms";
import CommunityFormField from "./CommunityFormField";
import CategoryFormField from "./CategoryFormField";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import { MeetiInput } from "../schemas/meetiSchema";
import FormError from "@/src/shared/components/forms/FormError";
import UploadImage from "@/src/shared/components/upload/UploadImage";

//componente dinamico desabilita ssr para que cargue solo en el cliente;
//?https://nextjs.org/docs/app/guides/lazy-loading#nextdynamic
const DinamycLocationPicker = dynamic(() => import("./LocationPicker"), {
  ssr: false,
});

export default function MeetiForm() {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<MeetiInput>();

  console.log(errors);

  const isVirtual = watch("virtual");

  return (
    <>
      <fieldset className="space-y-3">
        <legend className="font-black text-4xl mb-5">Detalles Meeti</legend>

        <FormLabel htmlFor="title">Nombre Meeti</FormLabel>
        <FormInput
          {...register("title")}
          id="title"
          type="text"
          placeholder="Titulo Meeti"
        />
        {errors.title && <FormError>{errors.title.message}</FormError>}

        <FormLabel htmlFor="details">Detalles Meeti</FormLabel>
        <FormTextArea
          {...register("details")}
          id="details"
          placeholder="Descripción Meeti"
        />
        {errors.details && <FormError>{errors.details.message}</FormError>}

        <FormLabel>Imágem del Meeti</FormLabel>
        <UploadImage />
        <CategoryFormField />
        <CommunityFormField />

        <FormLabel htmlFor="availableSeats">Cupo</FormLabel>
        <FormInput
          {...register("availableSeats", {
            valueAsNumber: true,
          })}
          type="number"
          min={1}
          id="availableSeats"
          placeholder="Cupo Disponible"
        />

        {errors.availableSeats && (
          <FormError>{errors.availableSeats.message}</FormError>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-3">
            <FormLabel htmlFor="date">Fecha:</FormLabel>
            <FormInput {...register("date")} type="date" id="date" />
            {errors.date && <FormError>{errors.date.message}</FormError>}
          </div>
          <div className="space-y-3">
            <FormLabel htmlFor="time">Hora:</FormLabel>
            <FormInput
              {...register("time")}
              type="time"
              step={1800}
              id="time"
            />
            {errors.time && <FormError>{errors.time.message}</FormError>}
          </div>
        </div>

        <FormLabel htmlFor="virtual">¿Evento Virtual?</FormLabel>
        <FormToggle
          checked={isVirtual}
          onChange={(e) => setValue("virtual", e.target.checked)}
        />
      </fieldset>

      {!isVirtual && (
        <fieldset className="space-y-3">
          <legend className="font-black text-4xl mb-5">Ubicación Meeti</legend>

          <FormLabel id="place_name">Nombre Lugar:</FormLabel>
          <FormInput
            id="place_name"
            type="text"
            placeholder="Nombre Lugar evento"
            {...register("location.placeName")}
          />
          {"location" in errors && errors.location?.placeName && (
            <FormError>{errors.location.placeName.message}</FormError>
          )}
          <DinamycLocationPicker />
        </fieldset>
      )}
    </>
  );
}
