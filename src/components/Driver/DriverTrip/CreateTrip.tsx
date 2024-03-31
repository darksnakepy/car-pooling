import { db } from "~/server/db"

interface DriverTripProps{
    driverId: string
    cars?: Cars[]
}

interface Cars{
    licensePlate: string
    model: string
}

const CreateTrip = async({driverId, cars}:DriverTripProps) =>{
    return(
        <div className="w-full h-screen flex items-center justify-center flex-col bg-[#181a1b]">
        <h1 className="text-[40px] mb-4 text-white">Create a trip</h1>
        <form className="w-1/4 flex flex-col p-7 border-2 rounded-lg mb-4" action={addTrip.bind(null, driverId)}>
            <label className="mb-1 text-white" htmlFor="depCity">Departure city:</label>
            <input name="depCity" id="depCity" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 dark:bg-[#202324] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <label className="mt-1 text-white" htmlFor="password">Destination city:</label>
            <input name="destCity" id="destCity" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 dark:bg-[#202324] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <label className="text-white" htmlFor="depDate">Departure date:</label>
            <input type="date" name="depDate" id="depDate" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 dark:bg-[#202324] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <label className="text-white" htmlFor="depHour">Departure hour:</label>
            <input type="time" name="depHour" id="lastname" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 dark:bg-[#202324] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <label className="mb-1 text-white" htmlFor="price">Price:</label>
            <input name="price" id="price" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 dark:bg-[#202324] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <label className="mb-1 text-white" htmlFor="estTime">Estimated time:</label>
            <input name="estTime" id="estTime" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 dark:bg-[#202324] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <label className="mb-1 text-white" htmlFor="price">Choose the car for your trip:</label>
            <select className="rounded-lg focus:ring-blue-500 block w-full p-2 dark:bg-[#202324] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="default"></option>
                    {cars?.map((car) => (
                        <option key={car.licensePlate} value={car.licensePlate}>
                            {car.model} - {car.licensePlate}
                        </option>
                    ))}
                </select>
            <button className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Create a trip</button>
        </form>
    </div>
    )
}

async function addTrip(id: string, formData: FormData){
    "use server"
    const trip = {
        depCity: formData.get("depCity") as string,
        destCity: formData.get("destCity") as string,
        depDate: formData.get("depDate") as string,
        depHour: formData.get("depHour") as string,
        price: formData.get("price") as string,
        estTime: formData.get("estTime") as string,
    }

    const user = await db.driver.findUnique({
        where: {
            id: id 
        }
    })

    if(!user){
        return null
    }

    const addTrip = await db.trip.create({
        data: {
            departureCity: trip.depCity,
            destinationCity: trip.destCity,
            depatureDate: trip.depDate,
            departureHour: trip.depHour,
            price: trip.price,
            estimatedTime: trip.estTime,
            driverId: id
        }
    })
}

export default CreateTrip