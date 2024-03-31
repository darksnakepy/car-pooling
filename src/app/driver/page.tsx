import { redirect } from "next/navigation"
import { validateRequest } from "~/server/auth"
import DriverPage from "~/components/DriverPage/DriverPage"
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
                    }
                },
            }
        }
    })

    return <DriverPage id={driver?.Driver?.id} Car={driver?.Driver?.Car}/>
}   

export default driver