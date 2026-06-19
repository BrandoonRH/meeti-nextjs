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
};
