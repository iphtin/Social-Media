import { connectToDB } from "@db"
import Post from "@models/Post";
import User from "@models/User";
import { formatDistanceToNow } from 'date-fns';

export const PATCH = async (req, { params }) => {
    try {
        await connectToDB();

        const { postId } = params

        const { userId } = await req.json();

        console.log("PostId", postId)
        console.log("UserId", userId)

        const post = await Post.findById(postId);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
          } else {
            post.likes.set(userId, true);
          }
        
          const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { likes: post.likes },
            { new: true }
          ).populate({
            path: 'userId',
            model:  User
          }).exec();

          // updatedPost.createdAt = formatDistanceToNow(new Date(updatedPost.createdAt), { addSuffix: true });

          const formattedPost = {
            ...updatedPost._doc,
            createdAt: formatDistanceToNow(new Date(updatedPost.createdAt), { addSuffix: true }),
        };


        return new Response(JSON.stringify(formattedPost), { status: 201 })

    } catch (error) {
      console.log(error.message)
     return new Response("Failed user to like this post!", { status: 500})
    }
}