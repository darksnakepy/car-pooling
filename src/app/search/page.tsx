import { redirect } from "next/navigation"
import DisplayTrips from "~/components/User/DisplayTrips"
import { validateRequest } from "~/server/auth"
import { db } from "~/server/db"

const Trip = async({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    
    const session = await validateRequest()

    const leavingfrom = searchParams.leavingfrom
    const goingto = searchParams.goingto
    const date = searchParams.date

    const trips = await db.trip.findMany({
        where:{
            departureCity:{
                contains: leavingfrom as string
            },
            destinationCity:{
                contains: goingto as string
            },
            departureDate:{
                contains: date as string
            }
        },
        select:{
            id:true,
            departureCity: true,
            destinationCity: true,
            departureHour: true,
            estimatedTime: true,
            departureDate: true,
            price: true
        }
    })

    if (session.user?.userType === "USER") {
        return (
            <div className="">
                <DisplayTrips userId={session.user.id} trips={trips}/>
            </div>
        )
    }
    return redirect("/")

}

export default Trip