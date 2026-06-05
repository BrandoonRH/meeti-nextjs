"use server";
import { requiereAuth } from "@/src/lib/auth-server";
import { meetiService } from "../services/MeetiService";
import { meetiAttendeesService } from "../services/MeetiAttendeesService";

 

export async function toggleAttendance(meetiId: string){
    const {session} = await requiereAuth(); 
    if(!session) throw new Error('Usuario no Autenticado'); 

    return await meetiAttendeesService.toggleAttendance(meetiId, session.user); 
}