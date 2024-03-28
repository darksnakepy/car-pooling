import { redirect } from "next/navigation"
import { validateRequest } from "~/server/auth"

const DriverPage = async() =>{

    const session = await validateRequest() 
    if(session.user?.role === "DRIVER"){
        return <DriverPage />
    }
    return redirect("/")
}   

export default DriverPage