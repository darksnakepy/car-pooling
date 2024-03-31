import { redirect } from "next/navigation"
import { validateRequest } from "~/server/auth"

const User = async() =>{

    const session = await validateRequest()
    if(session.user?.userType === "DRIVER"){
        return redirect("/driver")
    }
    return redirect("/user")
}

export default User