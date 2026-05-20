"use server";
import { requiereAuth } from "@/src/lib/auth-server";
import { membershipService } from "../services/MemberShipService";

 

export async function toggleMemberShipAction(id: string){
    const {session} = await requiereAuth(); 
    if(!session) throw new Error('Uusario no Autenticado'); 
    return await membershipService.toogleMemberShip(id, session.user); 

}