"use client";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import MeetiForm from "./MeetiForm";
import { useSession } from "@/src/lib/auth-client";
import { FormProvider, useForm } from "react-hook-form";
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMeetiAction } from "../actions/meeti.action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function CreateMeeti() {
  const methods = useForm({
    resolver: zodResolver(MeetiSchema),
    mode: "all",
    defaultValues: {
      title: "",
      details: "",
      categoryId: "",
      communityId: "",
      availableSeats: 0,
      date: "",
      time: "",
      image: "",
      virtual: false,
      location: {
        placeName: "",
        address: "",
        city: "",
        country: "",
        lat: 20.6515342,
        lng: -103.4054225,
      },
    },
  });
  const { isPending } = useSession();
  if (isPending) return "Cargando...";

  const onSubmitCreate = async (data: MeetiInput) => {
    console.log(data);
    const { error, success } = await createMeetiAction(data);
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
      <Form onSubmit={methods.handleSubmit(onSubmitCreate)} noValidate>
        <MeetiForm />
        <FormSubmit value="Crear Meeti" />
      </Form>
    </FormProvider>
  );
}
