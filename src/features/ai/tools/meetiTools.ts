import { tool } from "ai";
import z from "zod";
import { meetiService } from "../../meetis/services/MeetiService";

export const meetiTools = {
  getMeetisBySubject: tool({
    description:
      "Recomienda meetis cuando el usuario busque o te pregunte un meeti sobre un tema en específico",
    inputSchema: z.object({
      query: z.string().describe("Tema de interés del Meeti"),
    }),
    execute: async ({ query }) => {
      const meetis = await meetiService.getMeetisByTopic(query);

      if (!meetis.length) {
        return {
          meetis: [],
          totalMeetis: 0,
          message: `No encontré meetis relacionadas con ${query} ¿Te gustaría intentar con otra busqueda?`,
        };
      }

      return {
        meetis,
        totalMeetis: meetis.length,
      };
    },
  }),
  getVirtualMeetis: tool({
    description: `
    Usa esta herramienta cuando el usuario pregunta por meetis o eventos vituales. 
    - Si menciona un tema (React, IA, Marketing, Bitcoin, Café, etc), pásalo al query.
    - Si menciona "hoy", inclúyelo dentro del query.
    - Si el usuario solo pregunta por meetis virtuales, query ir vacio. 
    `,
    inputSchema: z.object({
      query: z
        .string()
        .optional()
        .describe("Tema de interés del usuario sobre el meeti o evento"),
    }),
    execute: async ({ query }) => {
      const meetis = await meetiService.getVirtualMeetis(query);

      if (!meetis.length) {
        return {
          meetis: [],
          totalMeetis: 0,
          message: `No encontré meetis relacionadas con ${query} que sean virtuales ¿Te gustaría intentar con otra busqueda?`,
        };
      }

      return {
        meetis,
        totalMeetis: meetis.length,
      };
    },
  }),
  getInPersonMeetis: tool({
    description: `
    Usa esta herramienta cuando el usuario pregunte por eventos precenciales. 
      Reglas: 
        - Si el usuario menciona una ciudad, inclúyela en 'city'. 
        - Si el usuario mecniona un país, unclúyelo en 'country'.
        - Si el usuario menciona un tema (React, Bitcoin, MKT, IA, CAFÉ), inclúyelo dentro de 'query'.
        - Si el usuario menciona hoy, pon 'today' como true. 
    `,
    inputSchema: z.object({
      city: z
        .string()
        .optional()
        .describe("Ciudad del meeti de interés del usuario"),
      country: z
        .string()
        .optional()
        .describe("País del meeti de interés del usuario"),
      query: z
        .string()
        .optional()
        .describe("Tema de interés del usuario sobre el meeti o evento"),
      today: z
        .boolean()
        .default(true)
        .describe("El usuario desea un meeti o evento hoy"),
    }),
    execute: async ({ city, country, query, today }) => {
      const meetis = await meetiService.getInPerson(
        city,
        country,
        query,
        today,
      );

      if (!meetis.length) {
        return {
          meetis: [],
          totalMeetis: 0,
          message: `No encontré meetis `,
        };
      }

      return {
        meetis,
        totalMeetis: meetis.length,
      };
    },
  }),
};
