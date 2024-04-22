"use client"

import bookTrip from "~/server/user/book";

interface DisplayTripsProps {
  userId: string
  trips: Trips[]
  status: string
  search: {
    leavingfrom: string
    goingto: string
    date: string
  };
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
  isBooked: boolean
}

const DisplayTrips = async ({ userId, trips, search, status }: DisplayTripsProps) => {
  return (
    <div className="flex justify-center h-screen bg-gray-200 text-black"> {/* Updated background and text color */}
      <div className="container mx-auto py-8">
        <div className="bg-white shadow rounded py-8">
          <h2 className="text-xl flex items-center justify-center font-bold mb-4 text-blue-600">
            Trips that we found 
          </h2>
          {trips.length > 0 && status !== "PENDING" || status !== "RESERVED" ? (
            <div className="col-span-4 sm:col-span-9">
              {trips.map((trip) => (
                !trip.isBooked ? (
                  <div
                    key={trip.id}
                    className="flex flex-col p-7 border-2 rounded-lg mb-4 bg-white mx-5 text-gray-700"
                  >
                    <p className="font-bold"> {/* Updated text color */}
                      {trip.departureCity.toUpperCase()} - {trip.destinationCity.toUpperCase()}
                    </p>
                    <div className="flex flex-row justify-between mt-2"> {/* Updated text color */}
                      <div className="text-sm">Departure Date: {trip.departureDate}</div>
                      <button
                        onClick={async () => await bookTrip(userId, trip.id)}
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-600 ml-2 relative"
                      >
                        Book this trip
                      </button>
                    </div>
                    <div className="text-sm font-bold">Details:</div>
                    <div className="text-sm mt-1">Departure Hour: {trip.departureHour}</div>
                    <div className="text-sm">Estimated Time: {trip.estimatedTime}</div>
                    <div className="text-sm mt-2">Cost: {trip.price}$</div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center mt-5 text-gray-400 font-bold">
                    No trips found
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center mt-5 text-gray-400 font-bold">
              No trips found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayTrips;
