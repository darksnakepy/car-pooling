import { redirect } from "next/navigation"
import { validateRequest } from "~/server/auth"
import { db } from "~/server/db"
import AddCar from "~/components/Driver/CarManagement/AddCar"

const addcar = async() =>{   
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
         return <AddCar driverId={driver?.Driver?.id}/>
    }
    return redirect("/")
}   

export default addcar