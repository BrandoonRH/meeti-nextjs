import { db } from "@/src/db";
import { User } from "../types";

export interface IAuthRepository {
  userExists(email: string): Promise<User | undefined>;
}

class AuthRepository implements IAuthRepository {
  async userExists(email: string) {
    return await db.query.users.findFirst({
      where: {
        email,
      },
    });
  }
} //AuthRepository

export const authRepository = new AuthRepository();
