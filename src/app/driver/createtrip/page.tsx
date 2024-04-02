import { redirect } from "next/navigation"
import { validateRequest } from "~/server/auth"
import DriverPage from "~/components/Driver/DriverPage"
import { db } from "~/server/db"
import AddCar from "~/components/Driver/CarManagement/AddCar"
import CreateTrip from "~/components/Driver/DriverTrip/CreateTrip"

const createtrip = async() =>{   
    const session = await validateRequest() 
    const driver = await db.user.findUnique({
        where: {
            id: session.user?.id
        },
        select: {
            Driver: {
                select: {
                    id: true,
                    Car: {
                        select: {
                            licensePlate: true,
                            model: true
                        }
                    },
                },
            }
        }        
    })


    if(session.user?.userType==="DRIVER"){
         return <CreateTrip driverId={driver?.Driver?.id} cars={driver?.Driver?.Car}/>
    }
    return redirect("/")
}   

export default createtrip