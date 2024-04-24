import { connectToDB } from "@db";
import User from "@models/User";

export const POST = async (req, { params }) => {
  try {
    await connectToDB();

    const { userId } = params;

    const friendId = await req.json();

    console.log("UserId", userId);
    console.log("FriendId", friendId);

    const user = await User.findById(userId);
    const otherUser = await User.findById(friendId);

    if (!user || !otherUser) {
      return new Response("User not found", { status: 404 });
    }

    // Check if the user is already following the friend
    const isFollowing = user.following.includes(friendId);

    if (isFollowing) {
      // Unfollow the friend
      user.following = user.following.filter(id => id.toString() !== friendId.toString());
      otherUser.follow = otherUser.follow.filter(id => id.toString() !== userId.toString());
    } else {
      // Follow the friend
      user.following.push(friendId);
      otherUser.follow.push(userId);
    }

    await user.save();
    await otherUser.save();

    return new Response("Users are updated", { status: 201 });

  } catch (error) {
    console.error(error.message);
    return new Response("Failed to update users", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
     try {

       await connectToDB();

       const { userId } = params

       const user = await User.findById(userId)
       .populate('following') 
       .populate('follow')

       console.log("User",user)

       if(!user) {
        return new Response("User Not Found!", { status: 400})
       }

       return new Response(JSON.stringify(user), { status: 200 })

     } catch (error) {
       console.log(error)
       return new Response("Failed to get user", { status: 500 })
     }
}