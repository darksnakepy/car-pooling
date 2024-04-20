import Link from "next/link";
import { validateRequest } from "~/server/auth";
import Image from 'next/image'
import UserMenu from "./UserMenu";
import { CaretDown } from "react-bootstrap-icons";

const NavBar = async () => {
  const session = await validateRequest();

  try {
    return (
      <div className="fixed w-full bg-gray-250 shadow">
        <div className="px-4 md:px-16 py-7 flex flex-row items-center justify-between overflow-hidden">
          {/* Logo */}
          {/* <Image src={} width={} height={}></Image>  */}

          <div className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-10 text-white">
            {session.session && session?.user?.userType === "DRIVER" ? (
              <>
                <Link href={"/driver/createtrip"} className="hover:text-blue-600 text-gray-900">
                  Create a new trip
                </Link>
                <Link href={"/driver/createcar"} className="hover:text-blue-600 text-gray-900">
                  Add a car
                </Link>
                <Link href={"/driver"} className="hover:text-blue-600 text-gray-900">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href={"/profile"} className="hover:text-blue-600 text-gray-900">
                  Your bookings
                </Link>
                <Link href={"/user"} className="hover:text-blue-600 text-gray-900">
                  Homepage
                </Link>
                <Link href={"/driver"} className="hover:text-blue-600 text-gray-900">
                  Ratings
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center justify-end hover:text-blue-600">
            <UserMenu username={"Your profile"} />
            <CaretDown className="text-gray-900 cursor-pointer"/>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default NavBar;
