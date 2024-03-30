import { validateRequest } from "~/server/auth"
import AddCar from "../CarManagement/AddCar"
import { Car } from "@prisma/client"

interface DriverPageProps{
    username: string,
    name: string
    lastName: string,
}


const DriverPage = async() =>{

    const session = await validateRequest()

    return(
        <>
        <AddCar driverId={""}/>
        </>
    )
}

export default DriverPage