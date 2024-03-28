import { redirect } from "next/navigation"
import { lucia, validateRequest } from "~/server/auth"
import { cookies } from "next/headers"
const Logout = async() =>{

    const session = await validateRequest()
    if(!session){
        
    }
    await lucia.invalidateSession(session.user?.id as string);
    //return redirect("/")
}

export default Logout