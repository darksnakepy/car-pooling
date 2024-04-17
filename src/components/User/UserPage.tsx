import Image from "next/image"
import user from "~/../public/contacts-xxl.png"

interface UserPageProps {
    userId: string
    name: string
    lastname: string
    email: string
    Bookings: Bookings[]
}

interface Bookings {
    id: string
    status: string
    trip: Trips
}

interface Trips {
    id: string
    departureCity: string
    destinationCity: string
    departureDate: string
    departureHour: string
    estimatedTime: string
    price: string
    status: string
    car: Car
}

interface Car{
    model: string
    licensePlate: string
}



const UserPage = ({ userId, name, lastname, email, Bookings }: UserPageProps) => {
    return (
        <div className="flex justify-center items-center h-screen bg-[#1e2022] text-white">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-[#181a1b] shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <Image src={user} width={"50"} height={"50"} alt="user" />
                                <h1 className="mt-3 text-xl font-bold">{name}, {lastname}</h1>
                                <p className="mt-2 text-gray-300">{email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-[#181a1b] shadow rounded-lg p-6">
                            <h2 className="text-xl flex items-center justify-center font-bold mb-4">Your reservations:</h2>
                            {Bookings && Bookings.length > 0 ? (
                                Bookings.map((b) => (
                                    <div key={b.id} className="w-full flex flex-col p-7 border-2 rounded-lg mb-4 dark:bg-[#202324] shadow-md">
                                        <p className="font-bold font-medium text-white">
                                            {b.trip.departureCity} - {b.trip.destinationCity}
                                        </p>
                                        <div className="flex flex-row justify-between mt-2 text-white">
                                            <div className="text-sm">Reservation's departure time: {b.trip.departureHour}</div>
                                            <div className="text-sm">Status: {b.status}</div>
                                        </div>
                                        <div className="text-sm">Reservation's departure Date: {b.trip.departureDate} </div>
                                        <div className="text-sm">Car of the trip: {b.trip.car.model}</div>
                                        
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center justify-center mt-5 text-[#404345] font-bold">No trips booked yet</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage
