"use client"

import acceptBooking from "~/server/driver/acceptBooking"

interface DriverPageProps {
    id?: string
    username?: string
    name?: string
    lastName?: string
    Car?: Car[]
    Trips?: Trips[]
}

interface Car {
    model: string
    licensePlate: string
}

interface Trips {
    id: string
    departureCity: string
    destinationCity: string
    departureDate: string
    departureHour: string
    estimatedTime: string
    price: string
    car: Car
    Booking: BookingProps
}

interface BookingProps{
    id: string
    status: string
    createdAt: string
    user: BookingUser
}

interface BookingUser{
    name: string
    lastname: string
}

const DriverPage = async ({ id, username, name, Car, Trips}: DriverPageProps) => {

    return (
        <div className="flex justify-center h-screen bg-gray-200 text-black">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <h1 className="mt-3 text-xl font-bold">Hello!, {username}</h1>
                                <p className="text-gray-800">{name}</p>
                                <p className="mt-2 text-gray-800">driver id: {id}</p>
                                <div className="mt-3 flex flex-wrap gap-4 justify-center">
                                    <a href="/driver/createtrip" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer">Create a new trip</a>
                                    <a href="/driver/createcar" className="text-white bg-gray-600 hover:bg-gray-700 focus:outline-none font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer">Add a car</a>
                                </div>
                            </div>
                            <hr className="my-6 border-t border-gray-800" />
                            <div className="flex flex-col">
                                <span className="text-[#bdb7af] uppercase font-bold tracking-wider mb-2 text-black">Your cars:</span>
                                <ul>
                                    {Car?.map((car, index) =>(
                                        <li key={index}>Model: {car.model} - Lic. Plate: {car.licensePlate}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl flex items-center justify-center font-bold mb-4">Created trips</h2>
                            {Trips && Trips.length > 0 ? (
                                Trips.map((trip) => (
                                    <div key={trip.id} className="w-full flex flex-col p-7 border-2 rounded-lg mb-4 shadow-md">
                                        <p className="font-bold font-medium text-gray-800">
                                            {trip.departureCity.toUpperCase()} - {trip.destinationCity.toUpperCase()}
                                        </p>
                                        <div className="flex flex-row justify-between mt-2 text-gray-800">
                                            <div className="text-sm ">Departure Time: {trip.departureHour}</div>
                                            <div className="text-sm font-bold">Estimated Time: {trip.estimatedTime}</div>
                                        </div>
                                        <div className="text-sm">Departure Date: {trip.departureDate}</div>
                                        <div className="text-sm mt-2">Cost: {trip.price.toString()}$</div>
                                        {trip.car ? (
                                            <div className="text-sm mt-2">Car: {trip.car.model}</div>
                                        ) : (
                                            <div className="text-sm mt-2">No associated car</div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center justify-center mt-5 text-[#404345] font-bold">No trips created</div>
                            )}
                        </div>
                        <div className="mt-5 bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl flex items-center justify-center font-bold mb-4">Bookings to accept</h2>
                            {Trips && Trips.length > 0 ? (
                                Trips.map((trip) => (
                                    <div key={trip.id} className="w-full flex flex-col p-7 border-2 rounded-lg mb-4 shadow-md">
                                        {trip.Booking && trip.Booking.length > 0 ? (
                                            trip.Booking.map((b) => (
                                                <div key={b.id}>
                                                    <p>Booking created on your trip: {trip.departureCity.toUpperCase()} - {trip.destinationCity.toUpperCase()} </p>
                                                    <p>User that has booked: {b.user.name} {b.user.lastname}</p>
                                                    {b.status === "ACCEPTED" ? (
                                                        <div>Booking succesfully accepted</div>) : (<button onClick={async () => await acceptBooking(b.id)} className="mt-2 px-3 py-1.5 bg-blue-700 text-white rounded-md focus:outline-none focus:bg-blue-900">Accept booking</button>)}
                                                </div>
                                            ))
                                        ) : (
                                            <div>No bookings yet</div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center justify-center mt-5 text-[#404345] font-bold">No trips created</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DriverPage;
