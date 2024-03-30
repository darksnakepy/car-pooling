import { redirect } from "next/navigation"
import { validateRequest } from "~/server/auth"
import DriverPage from "~/components/DriverPage/DriverPage"

const driver = async() =>{

    const session = await validateRequest() 

    return <DriverPage />
}   

export default driver