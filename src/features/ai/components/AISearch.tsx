"use client";
import { useChat } from "@ai-sdk/react";
import {
  Form,
  FormLabel,
  FormSubmit,
  FormTextArea,
} from "@/src/shared/components/forms";
import { useState } from "react";
import { Message } from "../types/ai.types";
import CommunityCard from "../../communities/components/CommunityCard";
import MeetiCard from "../../meetis/components/MeetiCard";

export default function AISearch() {
  const [input, setInput] = useState("");
  const { messages, status, sendMessage, error } = useChat<Message>();

  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className="whitespace-pre-wrap mt-5 p-5 border-b border-gray-300 last-of-type:border-none"
        >
          <p
            className={`${message.role === "user" ? "text-right" : "text-left"} font-black`}
          >
            {message.role === "user" ? "Usuario" : "Meeti IA:"}
          </p>
          {message.parts.map((part, i) => {
            const key = `${message.id}-${i}`;

            if (part.type === "text") {
              return (
                <div
                  key={key}
                  className={
                    message.role === "user" ? "text-right" : "text-left"
                  }
                  dangerouslySetInnerHTML={{ __html: part.text }}
                />
              );
            }

            //comunidades
            if (part.type === "tool-getRecommendedCommunities") {
              if (part.state !== "output-available") return;

              const { communities, totalFound } = part.output;
              if (!communities.length)
                return <p key={key}>{part.output.message}</p>;

              return (
                <div key={key} className="space-y-4">
                  <p className="text-gray-700 font-medium">
                    Encontré{" "}
                    {communities.length === 1
                      ? "Esta comunidad"
                      : `${communities.length} Comunidades`}{" "}
                    sobre{" "}
                    <span className="text-orange-600 font-bold">
                      {part.input.query}
                    </span>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {communities.map((c) => (
                      <CommunityCard key={c.id} community={c} />
                    ))}
                  </div>
                </div>
              );
            }

            //meetis

            if (
              part.type === "tool-getMeetisBySubject" ||
              part.type === "tool-getVirtualMeetis" ||
              part.type === "tool-getInPersonMeetis"
            ) {
              if (part.state !== "output-available") return null;
              const { meetis, message } = part.output;

              if (!meetis.length) return <p key={key}>{message}</p>;

              const typeText =
                part.type === "tool-getVirtualMeetis"
                  ? { singular: "Meeti Virtual", plural: "Meetis Virtuales" }
                  : part.type === "tool-getInPersonMeetis"
                    ? {
                        singular: "Meeti en esta ubicación",
                        plural: "Meetis en esta ubicación",
                      }
                    : { singular: "Meeti", plural: "Meetis" };

              return (
                <div key={key} className="space-y-4">
                  {/*  <p className="text-gray-700 font-medium">
                    Encontré{" "}
                    {meetis.length === 1
                      ? "Esté Meeti "
                      : `${meetis.length} Meetis`}{" "}
                    sobre{" "}
                    <span className="text-orange-600 font-bold">
                      {part.input.query}
                    </span>
                  </p> */}
                  <p className="text-gray-700 font-medium">
                    Encontré{" "}
                    {meetis.length === 1 ? (
                      <>
                        este{" "}
                        <span className="text-orange-500 font-bold">
                          {typeText.singular}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-orange-500 font-bold">
                          {meetis.length}
                        </span>{" "}
                        {typeText.plural}
                      </>
                    )}
                    {part.input.query && (
                      <>
                        {" "}
                        sobre: <span>{part.input.query}</span>
                      </>
                    )}
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-2 gap-5 mt-10">
                    {meetis.map((m) => (
                      <MeetiCard key={m.id} meeti={m} />
                    ))}
                  </div>
                </div>
              );
            }
          })}
        </div>
      ))}

      {status === "submitted" && (
        <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 text-orange-700 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100">
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
            </div>
            <div>
              <p className="font-semibold">Meeti IA está pensando...</p>
              <p className="text-sm text-orange-600">
                Buscando comunidades y meetis que mejor coincidan con tu
                consulta.
              </p>
            </div>
          </div>
        </div>
      )}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <FormLabel htmlFor="prompt">
          Busca Meetis y Comunidades utilizando IA
        </FormLabel>
        <FormTextArea
          id="prompt"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <FormSubmit
          value={"Consultar"}
          className="rounded-md"
          disabled={input.trim() === "" || status === "submitted"}
        />
      </Form>
    </>
  );
}
