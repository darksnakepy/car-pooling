import Image from "next/image";

interface UserPageProps {
  userId: string;
  name: string;
  lastname: string;
  email: string;
  Bookings: Bookings[];
}

interface Bookings {
  id: string;
  status: string;
  trip: Trips;
}

interface Trips {
  id: string;
  departureCity: string;
  destinationCity: string;
  departureDate: string;
  departureHour: string;
  estimatedTime: string;
  price: string;
  status: string;
  car: Car;
}

interface Car {
  model: string;
  licensePlate: string;
}

const UserPage = ({ userId, name, lastname, email, Bookings }: UserPageProps) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="container mx-auto py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between border-b-2 pb-4 mb-4">
              <div>
                <h1 className="text-2xl text-blue-600 font-semibold">Hello, {name} {lastname}</h1>
                <p className="text-gray-700">{email}</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Reservations</h2>
              {Bookings && Bookings.length > 0 ? (
                <div>
                  {Bookings.map((b) => (
                    <div key={b.id} className="border-b-2 py-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-lg font-semibold text-blue-600">{b.trip.departureCity.toUpperCase()} - {b.trip.destinationCity.toUpperCase()}</p>
                          <p className="mt-2 text-gray-700">Departure Date: {b.trip.departureDate}</p>
                        </div>
                        <p className="text-gray-700">Status: {b.status}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-700">Departure Time: {b.trip.departureHour}</p>
                        <p className="text-gray-700">Car Model: {b.trip.car.model.toUpperCase()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 text-gray-500">No trips booked yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
