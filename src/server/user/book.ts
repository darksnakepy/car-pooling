"use server"

import { redirect } from "next/navigation";
import { validateRequest } from "../auth";
import { db } from "../db";


const bookTrip = async(userId: string, tripId: string) =>{
    
    const session = await validateRequest()
    if(!session){
        return redirect("/login")
    }
    /*if(session.user?.userType !== "USER"){
        return redirect("")
    }*/

    try {
        const existingTrip = await db.trip.findUnique({
            where: {
                id: tripId
            }
        })
        if (!existingTrip){
            console.log("trip doesn't exist")
        }
        
        await db.booking.create({
            data: {
                tripId: tripId,
                userId: userId,
                status: "PENDING"
            }
        })

    }catch(error) {
        console.error("Error booking trip:", error);
    }
} 

export default bookTrip