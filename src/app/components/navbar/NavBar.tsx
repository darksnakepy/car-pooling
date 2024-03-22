"use client"
import Link from "next/link"
import { getUser } from "~/server/auth"
import Image from 'next/image'
import UserMenu from "../menu/UserMenu"
import { useRouter } from "next/navigation"

interface NavBarProps{
    isUserLogged: boolean
}

const NavBar = () =>{   

    const router = useRouter()    
    //const session = getUser()

    const handleClick = () =>{
        router.push("/register")
    }

    return(
        <div className="fixed w-full bg-[#181a1b] shadow-sm ">
            <div className="px-4 md:px-16 py-6 flex flex-row items-center justify-between overflow-hidden">
                {/*<Image src={} width={} height={}></Image> logo*/}

                <div className="ml-auto">
                        <UserMenu />          <button onClick={handleClick} className="ml-8 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#1545af] dark:hover:bg-blue-800 focus:outline-none">Sign up</button>
                </div>
            </div>      
        </div>
    )
}

export default NavBar