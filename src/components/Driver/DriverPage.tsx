import AddCar from "./CarManagement/AddCar"
import CreateTrip from "./DriverTrip/CreateTrip"

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
    departureCity: string
    destinationCity: string
    depatureTime: string
    estimatedTime: string
    cost: string
}

const DriverPage = async({id, username, name, lastName, Car, Trips}: DriverPageProps) =>{
    
    return (
        <div className="w-full h-screen bg-[#181a1b]"></div>
    )
    {/*return(
        <>
        <h1 className="text-white">{name}, {lastName}</h1>
        <AddCar driverId={id}></AddCar>
        <DriverTrip driverId={id} cars={Car}/>
        </>
    )*/}
}

export default DriverPage