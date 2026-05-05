import { SignUpSchemaType } from "../schemas/authSchema";

class AuthServices {
    async signUp(credentials: SignUpSchemaType) {
        console.log("Sign Up Service", credentials);
    }
}

export const authServices = new AuthServices();