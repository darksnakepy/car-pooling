import { redirect } from "next/navigation";
import { db } from "~/server/db";

interface DriverTripProps {
  driverId: string;
  cars?: Cars[];
}

interface Cars {
  licensePlate: string;
  model: string;
}

const CreateTrip = async ({ driverId, cars }: DriverTripProps) => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col bg-gray-200">
      <h1 className="text-3xl mb-4 text-gray-700 font-bold">Create a trip</h1>
      <form className="w-1/4 flex flex-col p-7 border rounded-lg mb-4 bg-white text-gray-700 border-gray-300" action={addTrip.bind(null, driverId)}>
        <label className="mb-1" htmlFor="depCity">Departure city:</label>
        <input name="depCity" id="depCity" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200" />
        <label className="mt-1" htmlFor="destCity">Destination city:</label>
        <input name="destCity" id="destCity" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200" />
        <label htmlFor="depDate">Departure date:</label>
        <input type="date" name="depDate" id="depDate" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200" />
        <label htmlFor="depHour">Departure hour:</label>
        <input type="time" name="depHour" id="depHour" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200" />
        <label className="mb-1" htmlFor="price">Price:</label>
        <input name="price" id="price" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200" />
        <label className="mb-1" htmlFor="estTime">Estimated time:</label>
        <input name="estTime" id="estTime" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200" />
        <label className="mb-1" htmlFor="seats">Available seats:</label>
        <input name="seats" id="seats" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200" />
        <label className="mb-1" htmlFor="selectedCar">Choose the car for your trip:</label>
        <select required defaultValue={"default"} id="selectedCar" name="selectedCar" className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200">
          <option value="default"></option>
          {cars?.map((car) => (
            <option key={car.licensePlate} value={car.licensePlate}>
              {car.model} - {car.licensePlate}
            </option>
          ))}
        </select>
        <button className="mt-3 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center text-white">
          Create a trip
        </button>
      </form>
    </div>
  );
};

async function addTrip(id: string, formData: FormData) {
  "use server";
  const trip = {
    depCity: formData.get("depCity") as string,
    destCity: formData.get("destCity") as string,
    depDate: formData.get("depDate") as string,
    depHour: formData.get("depHour") as string,
    price: formData.get("price") as string,
    estTime: formData.get("estTime") as string,
    seats: formData.get("seats") as string,
    carLicensePlate: formData.get("selectedCar") as string,
  };

  await db.trip.create({
    data: {
      seats: trip.seats,
      departureCity: trip.depCity.toLocaleLowerCase(),
      destinationCity: trip.destCity.toLocaleLowerCase(),
      departureDate: trip.depDate,
      departureHour: trip.depHour,
      price: trip.price,
      estimatedTime: trip.estTime,
      driverId: id,
      carlicensePlate: trip.carLicensePlate,
      isBooked: false,
    },
  });
  return redirect("/driver");
}

export default CreateTrip;
