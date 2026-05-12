import { CommunityInput } from "../schemas/communitySchema";
import {
  communityRepository,
  ICommunityRepository,
} from "./CommunityRepository";

export interface ICommunityService {}
class CommunityService implements ICommunityService {
  constructor(private communityRepository: ICommunityRepository) {}

  async createCommunity(data: CommunityInput, userId: string) {
    const community = await this.communityRepository.create({
      name: data.name,
      description: data.description,
      createdBy: userId,
    });
    return community;
  }
}

export const communityService = new CommunityService(communityRepository);
