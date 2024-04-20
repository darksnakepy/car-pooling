
import { validateRequest } from "../auth"
import { db } from "../db"

const rateDriver = async(value: number, driverId: string) =>{
    const session = await validateRequest()
    if(session.user?.userType !== "USER"){
        console.log("its a driver")
    }

    const feedback = await db.feedback.create({
        data:{
            userId: driverId,
            rating: value
        }
    })

    if(feedback){
        console.log("feedback exists")
    }

}

export default rateDriver