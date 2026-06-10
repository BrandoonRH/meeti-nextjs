"use server";
import { requiereAuth } from "@/src/lib/auth-server";
import { ProfileInput, ProfileSchema } from "../schemas/ProfileSchema";
import { profileService } from "../services/ProfileService";

 


export async function updateProfileAction(input: ProfileInput){
    const {session} = await requiereAuth(); 
    if(!session) {
        return {
            error : 'Error en la Autenticación',
            success: ''
        }
    }

    const data = ProfileSchema.safeParse(input);
    if(!data.success){
        return {
             error : 'Error en la Validación de Datos',
            success: ''
        }
    } 

    await profileService.updateProfile(input); 
     return {
             error : '',
            success: 'Perfil Actualizado Correctamente'
        }
}