import { Form, FormSubmit } from "@/src/shared/components/forms";
import React from "react";
import MeetiForm from "./MeetiForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema";
import { SelectMeeti } from "../types/meeti.types";
import { editMeetiAction } from "../actions/meeti.action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

interface EditMeetiProps {
  meeti: SelectMeeti;
}

export default function EditMeeti({ meeti }: EditMeetiProps) {
  const methods = useForm({
    resolver: zodResolver(MeetiSchema),
    mode: "all",
    defaultValues: meeti.virtual
      ? {
          ...meeti,
          virtual: true,
        }
      : {
          ...meeti,
          location: meeti.location!,
        },
  });
  const onSubmit = async (data: MeetiInput) => {
    const { error, success } = await editMeetiAction(meeti.id, data);
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
      redirect("/dashboard/meetis");
    }
  };
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <MeetiForm />
        <FormSubmit value={"Editar"} />
      </Form>
    </FormProvider>
  );
}
