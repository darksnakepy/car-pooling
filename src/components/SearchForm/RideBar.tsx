"use client"
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const RideBar = () => {
    const router = useRouter();

    const leavingfrom: React.RefObject<HTMLInputElement> = useRef(null)
    const goingto: React.RefObject<HTMLInputElement> = useRef(null)
    const date: React.RefObject<HTMLInputElement> = useRef(null)

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={(e) =>{
                    e.preventDefault()
                    router.push(`/search?${new URLSearchParams({leavingfrom: leavingfrom.current!.value, goingto: goingto.current!.value, date: date.current!.value}).toString()}`)}} className="flex">
                <div className="relative">
                    <input type="text" ref={leavingfrom} placeholder="Leaving from" required className="px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"/>
                    <input type="text" ref={goingto} placeholder="Going to" required className="px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300 ml-2"/>
                    <input type="date" ref={date} name="date" id="date" required className="px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300 ml-2 relative"/>
                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-2 relative">Search trip</button>
                </div>
            </form>
        </div>
    );
}

/*
async function RideBarAction(formData: FormData){
    "use server"
    
    const searchTrip = {
        from: formData.get("leavingfrom"),
        goingto: formData.get("goingto"),
        date: formData.get("date"),
    }
    const searchParams = new URLSearchParams(searchTrip as any); 
    return redirect(`/search?${searchParams.toString()}`);
}
*/
export default RideBar