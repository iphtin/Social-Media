import { connectToDB } from "@db";
import User from "@models/User";
import { hash } from "bcryptjs";

export const POST = async (req) => {
     try {

        await connectToDB()

        const body = await req.json();

        const { username, email, password, profileImage } = body

        console.log(username, email, password, profileImage);
        
        const existUser = await User.findOne({ email })

        if(existUser) {
            return new Response("User Already Exist", { status: 400})
        }

        const hashPassword = await hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            profileImage,
            password: hashPassword
        })

        await newUser.save()

        return new Response(JSON.stringify(newUser), {status: 200})

     } catch (error) {
        console,log(error.message)
        return new Response("Failed to create User!", { status: 500})
     }
}