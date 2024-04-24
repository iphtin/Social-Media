import { connectToDB } from "@db";
import User from "@models/User";
import Post from "@models/Post";
import { formatDistanceToNow } from "date-fns";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const { userId } = params;

        // Find the user by their userId and populate the following field
        const user = await User.findById(userId).populate('following');

        if (!user) {
            return new Response("User Not Found!", { status: 400 });
        }

        // Extract the user IDs of the following users
        const followingUserIds = user.following.map(f => f._id);

        // Find all posts where userId is in the list of followingUserIds
        const posts = await Post.find({ userId: { $in: followingUserIds } })
            .sort({ createdAt: 'desc' })
            .populate({
                path: "userId",
                model: User
            })
            .exec();

            const formattedPosts = posts.map((post) => ({
                ...post._doc,
                createdAt: formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
            }));

        return new Response(JSON.stringify(formattedPosts), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response("Failed to get posts", { status: 500 });
    }
};
