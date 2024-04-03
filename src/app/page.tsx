import Link from "next/link";
import NavBar from "../components/Nav/NavBar";
import RideBar from "../components/Search/RideBar";

export default function HomePage() {

  return (
    <div className="bg-[#1e2022]">
      <NavBar/>
      <RideBar />
    </div>
  );
}
