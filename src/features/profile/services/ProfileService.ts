import { auth } from "@/src/lib/auth";
import { ProfileInput } from "../schemas/ProfileSchema";
import { IProfileRepositopry, profileRepository } from "./ProfileRepository";
import { headers } from "next/headers";

class ProfileService {
  constructor(private readonly profileRepository: IProfileRepositopry) {}

  async updateProfile(data: ProfileInput) {
    const { bio, image, name } = data;
    await auth.api.updateUser({
      body: {
        name,
        image,
        bio,
      },
      headers: await headers(),
    });
  }
}

export const profileService = new ProfileService(profileRepository);
