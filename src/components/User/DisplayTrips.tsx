"use client"

import bookTrip from "~/server/user/book"

interface DisplayTripsProps {
  userId: string
  trips: Trips[]
  status: string
  search: {
    leavingfrom: string
    goingto: string
    date: string
  }
}

interface Trips {
  id: string
  departureCity: string
  destinationCity: string
  departureHour: string
  estimatedTime: string
  departureDate: string
  price: number
  driverId: string
}


const DisplayTrips = async({ userId, trips, search, status }: DisplayTripsProps) => {

  return (
    <div className="flex justify-center h-screen bg-[#1e2022] text-white">
      <div className="container mx-auto py-8">
        <div className="bg-[#181a1b] shadow rounded py-8">
          <h2 className="text-xl flex items-center justify-center font-bold mb-4">
            Found Trips
          </h2>
          {trips.length > 0 && status !== "PENDING" || status !== "RESERVED" ?  (
            trips.map((trip) => (
              <div
                key={trip.id}
                className="flex flex-col p-7 border-2 rounded-lg mb-4 dark:bg-[#202324] mx-5"
              >
                <p className="font-bold text-white">
                  {trip.departureCity.toUpperCase()} - {trip.destinationCity.toUpperCase()}
                </p>
                <div className="flex flex-row justify-between mt-2 text-white">
                  <div className="text-sm">Departure Date: {trip.departureDate}</div>
                  <button onClick={async() => await bookTrip(userId, trip.id)} type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-2 relative">Book this trip</button>
                </div>
                <div className="text-sm font-bold">Details:</div>
                <div className="text-sm mt-1">Departure Hour: {trip.departureHour}</div>
                <div className="text-sm">Estimated Time: {trip.estimatedTime}</div>
                <div className="text-sm mt-2">Cost: {trip.price}$</div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center mt-5 text-[#404345] font-bold">
              No trips found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DisplayTrips;
