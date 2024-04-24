"use client"

import { Ellipsis, Forward, Heart, MessageCircle, Share2 } from "lucide-react"
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "@features/posts/postsSlice";
import CommentsWidget from "./CommentsWidget";
import CommentInput from "./CommentInput";
import Link from "next/link";

const PostWidget = ({ likes, comments, postId, text, postImage, userPosted, createdAt }) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  console.log("Comments", comments)

  const patchLike = async () => {
    const response = await fetch(`/api/post/${postId}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ Posts: updatedPost }));
  };

  return (
    <div className='mt-6 rounded-md bg-white'>
      <div className='p-5'>

        <Link href={`profile/${userPosted._id}`} className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <img src={userPosted?.profileImage || "https://images.pexels.com/photos/161709/newborn-baby-feet-basket-161709.jpeg"} alt='profileImage'
              className='w-[60px] h-[60px] rounded-full'
            />
            <div>
              <h2 className='font-bold '>{userPosted?.username}</h2>
              <p className='text-gray-500 text-sm'>{createdAt}</p>
            </div>
          </div>
          <div className='mr-4'>
            <span className='text-[20px]'><Ellipsis /></span>
          </div>
        </Link>

        <div className='mt-4 relative'>
          <h3 className='text-[#111827]'> {text}
            <span className='text-blue-500'> #Frined-zone</span> 🔥</h3>
          <div className='w-full h-[300px] rounded-md mt-4'>
            <img src={postImage || "https://images.pexels.com/photos/877971/pexels-photo-877971.jpeg"} alt='postImage'
              className={`w-full h-full rounded-md`}
            />
          </div>
          <div className='mt-4 flex justify-between'>
            <div className='space-x-3 flex items-center'>
              <div className='flex items-center space-x-2'>
                <span onClick={patchLike} className='cursor-pointer text-black'>
                  {isLiked ? (
                    <FavoriteOutlined className="text-red-600" />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </span>
                <p className='font-semibold text-sm'>{likeCount}</p>
              </div>
              <div onClick={() => setIsComments(true)} className='flex items-center space-x-2'>
                <span className='cursor-pointer text-balck'><MessageCircle /></span>
                <p className='font-semibold text-sm'>{comments.length}</p>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='cursor-pointer text-black'><Forward /></span>
              </div>
            </div>
            <div className='mr-4'>
              <span><Share2 /></span>
            </div>
          </div>

          {isComments && (
            <div className="w-full space-y-2 h-[300px] absolute rounded-md bottom-0 bg-[#FBFBFB] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
              {comments.map(comment => (
                <CommentsWidget key={comment.length} comment={comment} setIsComments={setIsComments} />
              ))}
             </div>
          )}
        </div>

        {isComments && (
          <CommentInput postId={postId} />
        )}

      </div>
    </div>
  )
}

export default PostWidget