import React, { useState } from "react";
import { UploadDropzone } from "../../utils/uploadthing";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { CommunityInput } from "@/src/features/communities/schemas/communitySchema";
import FormError from "../forms/FormError";

export default function UploadImage() {
  const [uploadedImage, setUploadedImage] = useState("");

  const {
    formState: { errors },
    setValue,
  } = useFormContext<CommunityInput>();
  return (
    <>
      <UploadDropzone
        endpoint={"meetiUploader"}
        className="ut-button:bg-orange-600 hover:ut-button:bg-orange-700 ut-button:w-full ut-button:py-3  ut-label:uppercase ut-label:text-gray-400"
        content={{
          button: "Sube una imagen",
          label: "Selecciona una archivo o arrastralo aquí",
        }}
        /* appearance={{
          button: "bg-green-500"
        }} */
        config={{
          mode: "auto",
        }}
        onClientUploadComplete={(res) => {
          setUploadedImage(res[0].ufsUrl);
          setValue("image", res[0].ufsUrl, {
            shouldValidate: true,
          });
        }}
      />

      {errors.image && <FormError>{errors.image.message}</FormError>}

      {uploadedImage && (
        <>
          <p className="text-lg font-bold">Imagen Nueva</p>
          <Image
            src={uploadedImage}
            alt="Imagen Publica"
            width={300}
            height={200}
          />
        </>
      )}
    </>
  );
}
