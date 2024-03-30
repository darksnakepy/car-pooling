import Link from "next/link";
import { db } from "~/server/db";
import { Argon2id } from "oslo/password";
import { redirect } from "next/navigation";
import { lucia } from "~/server/auth";
import { cookies } from "next/headers";
import { error } from "console";

const LogIn = () => {
    return(
        <div className="w-full h-screen flex items-center justify-center flex-col bg-[#181a1b]">
        <h1 className="text-[40px] mb-4 text-white">Login</h1>
        <form className="w-1/4 flex flex-col p-7 border-2 rounded-lg mb-4" action={login}>
            <label className="mb-1 text-white" htmlFor="username">Username:</label>
            <input name="username" id="username" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 dark:bg-[#202324] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <label className="mt-1 text-white" htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 dark:bg-[#202324] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <button className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Log in</button>

            <div className="text-white mt-3 text-[15px]">
                    <Link className="hover:underline" href={"register/driver/"}>Register</Link>
            </div>
        </form>
    </div>
    )
}

async function login(formData: FormData){
    "use server"
    const userData = 
    {
        user: formData.get("username") as string,
        pass: formData.get("password") as string
    }

    const existingUser = await db.user.findUnique({
        where: {
            username: userData.user
        }
    })

    if(!existingUser){
        console.log("user not found")
        return 
    }

    const password = await new Argon2id().verify(existingUser.password, userData.pass)
    
    if(password){
        const session = await lucia.createSession(existingUser.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return redirect("/")
    }
}

export default LogIn