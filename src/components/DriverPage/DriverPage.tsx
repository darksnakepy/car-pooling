import { validateRequest } from "~/server/auth"
import AddCar from "../CarManagement/AddCar"
import { Car } from "@prisma/client"
import DriverTrip from "./DriverTrip/DriverTrip"

interface DriverPageProps{
    id: string
    username?: string,
    name?: string
    lastName?: string,
    Car?: CarProps[]
}

interface CarProps{
    model: string
    licensePlate: string
}

const DriverPage = async({id, username, name, lastName, Car}: DriverPageProps) =>{

    const session = await validateRequest()

    return(
        <>
        <AddCar driverId={id}></AddCar>
        <DriverTrip driverId={id} cars={Car}/>
        </>
    )
}

export default DriverPage