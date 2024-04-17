import Link from "next/link";
import { db } from "~/server/db";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { lucia, validateRequest } from "~/server/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"


const driverRegister = async() =>{
    return(
        <div className="w-full h-screen flex items-center justify-center flex-col bg-gray-200">
			<h1 className="text-3xl mb-4 text-gray-700">Sign up as Driver</h1>
			<form className="w-1/4 flex flex-col p-7 border  rounded-lg mb-4 bg-white text-gray-700 border-gray-300" action={register}>
				<label className="mb-1" htmlFor="username">Username:</label>
				<input name="username" id="username" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200"/>
				<label className="mt-1" htmlFor="password">Password:</label>
				<input type="password" name="password" id="password" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200"/>
				<label className="" htmlFor="name">Your first name</label>
				<input name="name" id="name" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200"/>
				<label className="" htmlFor="surname">Your last name</label>
				<input name="lastname" id="lastname" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200"/>
				<label className="mb-1 " htmlFor="email">Your email</label>
				<input type="email" name="email" id="email" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200"/>
				<label className="mb-1 " htmlFor="tel">Your phone number</label>
				<input type="tel" name="phoneNumber" id="phoneNumber" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200" />
				<label className="mb-1 " htmlFor="id">Identity Card</label>
				<input name="identitycard" id="identitycard" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200"/>
				<label className="mb-1 " htmlFor="id">License ID</label>
				<input name="license" id="license" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200"/>
				<label className="mb-1 " htmlFor="id">License expiration</label>
				<input type="date" name="expiration" id="expiration" required className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2 bg-gray-200"/>
				<button className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Sign up</button>
			</form>
			<div className="text-gray-700 mt-3 text-sm flex items-center justify-center flex-col">
				<div>Do you have an account? <Link className="hover:underline text-blue-500" href={"/login"}>Login</Link></div>
				<div className="mt-1">Are you a passenger? <Link className="hover:underline text-blue-500" href={"/register"}>Register</Link></div>
			</div>
		</div>
    )
}

async function register(formData: FormData){
	'use server';

	let dateTime = new Date().toString()

	const user = {
		username: formData.get('username') as string,
		name: formData.get('name') as string,
		lastname: formData.get('lastname') as string,
		email: formData.get('email') as string,
		password: formData.get('password') as string,
		phoneNumber: formData.get('phoneNumber') as string,
		identityCard: formData.get('identitycard') as string,
		license: formData.get('license') as string,
		expiration: formData.get('expiration') as string
	}	

	if(typeof user.username !== "string" || user.username.length < 3){
		return {
			error: "Username is not valid or too short",
		} 
	}
	if(typeof user.email !== "string"){
		return {
			error: "Email is not valid"
		} 
	}
	if(typeof user.password !== "string"){
		return {
			error: "Password is not valid"
		} 
	}
	if(typeof user.name !== "string"){
		return {
			error: "Name is not valid"
		} 
	}
	if(typeof user.lastname !== "string"){
		return {
			error: "Lastname is not valid"
		} 
	}
	if(typeof user.phoneNumber !== "string"){
		return {
			error: "Phone number is not valid"
		} 
	}
	if(typeof user.identityCard !== "string"){
		return {
			error: "Identity card is not valid"
		} 
	}

	const hashedPassword = await new Argon2id().hash(user.password);
	const id = generateId(15)

	try{
		const newUser = await db.user.create({
			data: {
				id: id,
				username: user.username,
				email: user.email,
				password: hashedPassword,
				name: user.name,
				lastname: user.lastname,
				phoneNumber: user.phoneNumber,
				idCard: user.identityCard,
				userType: "DRIVER",
				Driver: {
					create: {
						license:{
							create: {
								licenseId: user.license,
								expiration: new Date(user.expiration)						
							}
						}
					}
				} 
			}
		})
		}catch (error) {
			console.error("Error registering user:", error);
		}

	const session = await lucia.createSession(id, {})
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/")
} 

export default driverRegister