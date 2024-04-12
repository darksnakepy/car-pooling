import { validateRequest } from "~/server/auth";
import NavBar from "../components/Nav/NavBar";
import RideBar from "../components/SearchForm/RideBar";

export default async function HomePage() {

  const session = await validateRequest()

  return (
    <div className="bg-[#1e2022]">
      <NavBar/>
      {session.user?.userType === "USER" ? (
        <RideBar />) : ( 
          <div className="w-full h-screen bg-[#1e2022]"></div>
      )}
    </div>
  );
}
