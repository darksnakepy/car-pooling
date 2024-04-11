import Link from "next/link"
import { validateRequest } from "~/server/auth"
import Image from 'next/image'
import UserMenu from "./UserMenu"
import { redirect } from "next/navigation"


const NavBar = async() =>{   

    const session = await validateRequest()

    return(
        <div className="fixed w-full bg-[#181a1b] shadow-sm ">
            <div className="px-4 md:px-16 py-6 flex flex-row items-center justify-between overflow-hidden">
                {/*<Image src={} width={} height={}></Image> logo*/}

                <div className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                    {session.session && session?.user?.userType === "DRIVER" ? 
                        <ul>  
                            <Link href={"/driver/createtrip"} className="">Create a new trip</Link>
                            <Link href={"/driver/createcar"} className="">Add a car</Link>
                            <Link href={"/driver"} className="">Dashboard</Link>
                        </ul>
                        :
                        <>
                            <Link href={"/driver"} className="">Your bookings</Link>
                            <Link href={"/driver"} className=""></Link>
                        </>
                    }
                    <UserMenu username={session.user?.username}/>
                </div>
            </div>      
        </div>
    )
}

export default NavBar