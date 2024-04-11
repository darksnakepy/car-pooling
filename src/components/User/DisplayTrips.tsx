interface DisplayTripsProps {
  userId?: string;
  trips: Trips[]; 
  search: {
    leavingfrom: string; 
    goingto: string; 
    date: string; 
  };
}

interface Trips {
  id: string;
  departureCity: string;
  destinationCity: string;
  departureHour: string;
  estimatedTime: string;
  departureDate: string;
  price: number;
}

const DisplayTrips = ({ userId, trips, search }: DisplayTripsProps) => {
  return (
    <div className="flex justify-center h-screen bg-[#1e2022] text-white">
      <div className="container mx-auto py-8">
        <div className="bg-[#181a1b] shadow rounded py-8">
          <h2 className="text-xl flex items-center justify-center font-bold mb-4">
            Found Trips
          </h2>
          {trips.length > 0 ? (
            trips.map((trip) => (
              <div
                key={trip.id}
                className="flex flex-col p-7 border-2 rounded-lg mb-4 dark:bg-[#202324] mx-5"
              >
                <p className="font-bold font-medium text-white">
                  {trip.departureCity} - {trip.destinationCity}
                </p>
                <div className="flex flex-row justify-between mt-2 text-white">
                  <div className="text-sm">Departure Time: {trip.departureHour}</div>
                  <div className="text-sm font-bold">Estimated Time: {trip.estimatedTime}</div>
                </div>
                <div className="text-sm">Departure Date: {trip.departureDate}</div>
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
  );
};

export default DisplayTrips;
