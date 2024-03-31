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

                <div className="ml-auto">
                    <UserMenu username={session.user?.username} />
                </div>
            </div>      
        </div>
    )
}

export default NavBar