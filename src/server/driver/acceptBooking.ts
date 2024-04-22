"use server"

import { validateRequest } from "../auth"
import { db } from "../db"

const acceptBooking = async(bookingId: string) =>{
    const session = await validateRequest()
    if(session.user?.userType !=="DRIVER"){
        return null
    }
    
    try{
        await db.booking.update({
            where:{
                id: bookingId
            },
            data:{
                status: "ACCEPTED"
            }
        })
        }
    catch(error){
        console.log(error)
    }
}


export default acceptBooking