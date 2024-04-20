"use client"

import Image from "next/image";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import rateDriver from "~/server/user/rateDriver";

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
  Driver: DriverProps
}

interface Car {
  model: string;
  licensePlate: string;
}

interface DriverProps{
  User: driverName
}

interface driverName{
  id: string
  name:string
  lastname: string
}

const UserPage = ({ userId, name, lastname, email, Bookings }: UserPageProps) => {

  const [value, setValue] = useState<number | null>(0);
  console.log(value)

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
                        <p className="text-gray-700">Status of your booking: {b.status}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-700">Departure Time: {b.trip.departureHour}</p>
                        <p className="text-gray-700">Your driver: {b.trip.Driver.User.name} {b.trip.Driver.User.lastname}</p>
                        {/*b.status === "ACCEPTED" ? (
                          <div>
                           {<Typography className="text-gray-700" component="legend">Give the driver a rating</Typography>
                           <Rating
                              name="simple-controlled"
                              value={value}
                              onChange={(event, newValue) => {
                                setValue(newValue);
                              }}
                          />{value ? <button className="mt-2 px-3 py-1.5 bg-blue-700 text-white rounded-md focus:outline-none focus:bg-blue-900" onClick={async () => {rateDriver(value, b.trip.Driver.User.id)}}>Rate</button> : <div></div> }
                            </div>) : (<div></div>)} */}
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
