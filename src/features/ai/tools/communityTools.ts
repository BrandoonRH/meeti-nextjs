import { tool } from "ai";
import z from "zod";
import { communityService } from "../../communities/services/CommunityService";

export const communityTools = {
  getRecommendedCommunities: tool({
    description:
      "Recomienda comunidades cuando el usuario busque o te pregunte una comunidad sobre un tema en específico",
    inputSchema: z.object({
      query: z.string().describe("Tema de interés del usuarios"),
    }),
    execute: async ({ query }) => {
      const communities = await communityService.searchCommunityByTopic(query);
      if(!communities.length){
        return {
          communities: [],
          totalFound: 0,
          message: `No encontré comunidades relacionadas con ${query} ¿Te gustaría intentar con otra busqueda?`
        }
      }
      return {
        communities,
        totalFound: communities.length,
      };
    },
  }),
};
