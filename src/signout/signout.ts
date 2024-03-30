"use server"
import { redirect } from "next/navigation";
import { lucia, validateRequest } from "~/server/auth";
import { cookies } from "next/headers";

const signOut = async() =>{
    try{
        const session = await validateRequest()
        if(!session){
            return null
        }
        await lucia.invalidateSession(session.id);

        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return redirect("/")
    }catch(error) {
        return error
    }
}

export default signOut
