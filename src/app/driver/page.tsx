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
                            id: true,
                            departureCity: true,
                            destinationCity: true,
                            departureHour: true,
                            estimatedTime: true,
                            departureDate: true,
                            price: true,
                            car: {
                                select: {
                                    licensePlate: true,
                                    model: true
                                }
                            },
                            Booking: {
                                select:{
                                    id:true,
                                    status: true,
                                    user:{
                                        select:{
                                            name: true,
                                            lastname: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            },
            username: true,
            name: true,
            lastname: true,
            Feedback: {
                select: {
                    rating: true
                }
            }
        }        
    })

    const DriverPageProps = {
        id: driver?.Driver?.id,
        Car: driver?.Driver?.Car,
        username: driver?.username,
        name: driver?.name,
        lastname: driver?.lastname,
        Trips: driver?.Driver?.trips,
        Feedback: driver?.Feedback
    }
    
    if(session.user?.userType==="DRIVER"){
         return <DriverPage {...DriverPageProps}/>
    }
    return redirect("/")
}   

export default driver