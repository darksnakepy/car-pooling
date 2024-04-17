import { string } from "zod"
import UserPage from "~/components/User/UserPage"
import { validateRequest } from "~/server/auth"
import { db } from "~/server/db"

const user = async() =>{

    const session = await validateRequest()


    const user = await db.user.findUnique({
        where: {
            id: session.user?.id
        },
        select: {
            id: true,
            name: true,
            lastname: true,
            email: true,
            Booking: {
                select: {
                    id: true,
                    status: true,
                    trip: {
                        select: {
                            id: true,
                            departureCity: true,
                            destinationCity: true,
                            departureHour: true,
                            estimatedTime: true,
                            departureDate: true,
                            price: true,
                            car: {
                                select:{
                                    licensePlate: true,
                                    model: true
                                }
                            }
                        }
                    }
                }
            }
        }
        

    })

    const UserPageProp ={
        id: user?.id, 
        name: user?.name,
        lastname: user?.lastname,
        email: user?.email,
        Bookings: user?.Booking
    }


    if(session.user?.userType === "USER"){
        return <UserPage {...UserPageProp}/>//userId={session.user.id} name={user?.name} lastname={user?.lastname} Bookings={user?.Booking}/>

    }
}

export default user