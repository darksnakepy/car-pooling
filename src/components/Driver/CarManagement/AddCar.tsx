import { redirect } from "next/navigation"
import { db } from "~/server/db"

interface AddCarProps{
    driverId: string
}

const AddCar = ({driverId}: AddCarProps) =>{

    return (
        <div className="w-full h-screen flex items-center justify-center flex-col bg-gray-200">
            <h1 className="text-3xl mb-4 font-bold text-gray-700">Create a new car</h1>
            <form className="w-1/4 flex flex-col p-7 border rounded-lg mb-4 bg-white border-gray-300" action={addCar.bind(null, driverId)}>
                <label className="mb-1" htmlFor="carModel">Model:</label>
                <input name="carModel" id="carModel" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200" />
                <label className="mt-1" htmlFor="licensePlate">License Plate</label>
                <input name="licensePlate" id="licensePlate" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200" />
                <button className="mt-3 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center text-white">
                    Add car
                </button>
            </form>
        </div>
    );
}

async function addCar(driverId: string, formData: FormData){
    "use server"

    const car = {
        carModel: formData.get("carModel") as string,
        license: formData.get("licensePlate") as string
    }

    const user = await db.driver.findUnique({
        where: {
            id: driverId 
        }
    })

    if(!user){
        return null
    }

    const checkVehicle = await db.car.findUnique({
        where: {
            licensePlate: car.license
        }
    })

    if(checkVehicle){
       console.log("car exists")
    }
    
    await db.car.create({
        data: {
            licensePlate: car.license,
            model: car.carModel,
            Driver: {
                connect: {
                    id: driverId
                }
            }
        }
    })
    return redirect("/driver")
}

export default AddCar