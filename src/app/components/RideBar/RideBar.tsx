
const RideBar = () => {
    return(
        <div className="flex justify-center items-center h-screen">
            <form action={RideBarAction}>
                <input type="text" placeholder="Leaving from" className="px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"/>
                <input type="text" placeholder="Going to" className="px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300 ml-2"/>
                <input type="date" className="px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300 ml-2" />
                <input
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-2"
                />   
            </form>
        </div>
    )
}

async function RideBarAction(formData: FormData){
    "use server"
    /* Fetch formdata and make the final request to search for a ride */
}

export default RideBar