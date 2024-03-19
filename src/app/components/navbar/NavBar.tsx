"use client"
import Link from "next/link"
import { getUser } from "~/server/auth"
import Image from 'next/image'


interface NavBarProps{
    isUserLogged: boolean
}

const NavBar = ({isUserLogged} :NavBarProps) =>{
    
    //const user = getUser()

    return(
        <div className="fixed w-full bg-[#181a1b] shadow-sm ">
            <div className="px-4 md:px-16 py-6 flex flex-row items-center overflow-hidden">
                {/*<Image src={} width={} height={}></Image>*/}
                    {isUserLogged ? <Link href={"/register"}>Sign Up</Link> : <Link href={""}>{"ildiocane"}</Link>}
            </div>      
        </div>
    )
}

export default NavBar