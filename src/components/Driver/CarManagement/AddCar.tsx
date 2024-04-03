import { db } from "~/server/db"

interface AddCarProps{
    driverId: string
}

const AddCar = ({driverId}: AddCarProps) =>{

    return(
        <div className="w-full h-screen flex items-center justify-center flex-col bg-[#1e2022]">
			<h1 className="text-[35px] mb-4 font-bold text-white">Create a new car</h1>
			<form className="w-1/4 flex flex-col p-7 border-2 rounded-lg mb-4 bg-[#181a1b]" action={addCar.bind(null, driverId)}>
				<label className="mb-1 text-white" htmlFor="carModel">Model:</label>
				<input name="carModel" id="carModel" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 dark:bg-[#202324] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
				<label className="mt-1 text-white" htmlFor="licensePlate">License Plate</label>
                <input name="licensePlate" id="licensePlate" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 dark:bg-[#202324] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <button className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Add car</button>
            </form>
        </div>
    )
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
        //handle the error
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
}

export default AddCar