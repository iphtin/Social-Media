import { connectToDB } from "@db";
import Post from "@models/Post";
import User from "@models/User"; 
import { formatDistanceToNow } from 'date-fns';

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const { userId } = params;

        const posts = await Post.find({ userId: userId })
            .sort({ createdAt: 'desc' })
            .populate({
                path: "userId",
                model: User
            })
            .exec();

        if (!posts) {
            return new Response("Posts Not Found!", { status: 400 });
        }

        const formattedPosts = posts.map((post) => ({
            ...post._doc,
            createdAt: formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
        }));


        return new Response(JSON.stringify(formattedPosts), { status: 200 });

    } catch (error) {
        console.log(error)
        return new Response("Failed to get posts", { status: 500 });
    }
};
