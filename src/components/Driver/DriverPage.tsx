import Image from "next/image"
import user from "~/../public/contacts-xxl.png"

interface DriverPageProps{ 
    id: string
    username?: string
    name?: string
    lastName?: string
    Car?: CarProps[]
    Trips?: Trips[]
}

interface CarProps{
    model: string
    licensePlate: string
}

interface Trips{
    id: string
    departureCity: string
    destinationCity: string
    departureDate: string
    departureHour: string
    estimatedTime: string
    price: string
}

const DriverPage = async({id, username, name, lastName, Car, Trips}: DriverPageProps) =>{

    return (
        <div className="flex justify-center items-center h-screen bg-[#1e2022] text-white">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-[#181a1b] shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <Image src={user} width={"50"} height={"50"} alt="user"/>
                                <h1 className="mt-3 text-xl font-bold">{username}</h1>
                                <p className="text-gray-300">{name}</p>
                                <p className="mt-2 text-gray-300">driver id: {id}</p>
                                <div className="mt-3 flex flex-wrap gap-4 justify-center">
                                    <a href="/driver/createtrip" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer">Create a new trip</a>
                                    <a href="/driver/createcar" className="text-white bg-gray-600 hover:bg-gray-700 focus:outline-none font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer">Add a car</a>
                                </div>
                            </div>
                            <hr className="my-6 border-t border-gray-300" />
                            <div className="flex flex-col">
                                <span className="text-[#bdb7af] uppercase font-bold tracking-wider mb-2">Your cars:</span>
                                <ul>
                                    {Car?.map((car) =>(
                                        <li>Model: {car.model} - Lic Plate: {car.licensePlate}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-[#181a1b] shadow rounded-lg p-6">
                            <h2 className="text-xl flex items-center justify-center font-bold mb-4">Created trips</h2>
                            {Trips?.map((trip) => (
                                <div key={trip.id} className="w-full flex flex-col p-7 border-2 rounded-lg mb-4 dark:bg-[#202324] shadow-md">
                                <p className="font-bold font-medium text-white">
                                    {trip.departureCity} - {trip.destinationCity}
                                </p>
                                <div className="flex flex-row justify-between mt-2 text-white">
                                    <div className="text-sm">Departure Time: {trip.departureHour}</div>
                                    <div className="text-sm font-bold">Estimated Time: {trip.estimatedTime}</div>
                                </div>
                                    <div className="text-sm">Departure Date: {trip.departureDate}</div>
                                    <div className="text-sm mt-2">Cost: {trip.price.toString()}$</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DriverPage