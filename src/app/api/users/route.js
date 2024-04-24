import { connectToDB } from "@db";
import User from "@models/User";
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {
        await connectToDB();

        const users = await User.find();

        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        return NextResponse.json(error.message, {status: 500})
    }
}