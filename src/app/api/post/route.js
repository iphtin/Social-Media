import { connectToDB } from "@db"
import Post from "@models/Post";
import User from "@models/User";
import { formatDistanceToNow } from 'date-fns';

export const POST = async (req) => {
    try {
        await connectToDB()
        const body = await req.json();

        const { postImage, text, userId } = body;

        const newPost = await Post.create({
            postImage,
            text, userId,
            likes: {},
            comments: [],
        })

        await newPost.populate('userId');

        const formattedPost = {
            ...newPost._doc,
            createdAt: formatDistanceToNow(new Date(newPost.createdAt), { addSuffix: true }),
        };

        return new Response(JSON.stringify(formattedPost), { status: 200 })

    } catch (error) {
        console.log(error.message)
        return new Response("Failed to create this Post", { status: 500 })
    }
}

export const GET = async (req) => {
    try {
        await connectToDB()

        const Posts = await Post.find()
            .sort({ createdAt: 'desc' })
            .populate({
                path: "userId",
                model: User
            })
            .exec();

        // Format the createdAt date
        const formattedPosts = Posts.map((post) => ({
            ...post._doc,
            createdAt: formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
        }));

        return new Response(JSON.stringify(formattedPosts), { status: 200 })

    } catch (error) {
        return new Response("Failed to get Posts", { status: 500 })
    }
}