import { redirect } from "next/navigation"
import { validateRequest } from "~/server/auth"
import DriverPage from "~/components/Driver/DriverPage"
import { db } from "~/server/db"

const driver = async() =>{
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
                    trips: {
                        select:{
                            departureCity: true,
                            destinationCity: true,
                            departureHour: true,
                            estimatedTime: true,
                            price: true
                        }
                    }
                },
            },
            username: true,
            name: true,
            lastname: true
        }        
    })

    if(session.user?.userType==="DRIVER"){
         return <DriverPage 
                    id={driver?.Driver?.id} 
                    Car={driver?.Driver?.Car} 
                    username={driver?.username}
                    name={driver?.name}
                    lastname={driver?.lastname}
                />
    }
    return redirect("/")
}   

export default driver