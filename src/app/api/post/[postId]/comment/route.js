import { connectToDB } from "@db"
import Post from "@models/Post";
import { formatDistanceToNow } from "date-fns";

export const POST = async (req, {params}) => {
    try {
        await connectToDB();

        const { postId } = params

        const { user, comment } = await req.json();

        const post = await Post.findById(postId);

        if(!post) {
            return new Response("Post not found", { status: 400 })
        }

        post.comments.push({user, text: comment})

        const updatedPost = await post.save();

        const formattedPost = {
            ...updatedPost._doc,
            createdAt: formatDistanceToNow(new Date(updatedPost.createdAt), { addSuffix: true }),
        };

        return new Response(JSON.stringify(formattedPost), { status: 201 })

    } catch (error) {
        return new Response("Failed to comment this post", { status: 500})
    }
}