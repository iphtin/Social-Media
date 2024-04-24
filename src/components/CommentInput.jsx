"use client"

import { setPost } from "@features/posts/postsSlice";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

const CommentInput = ({postId}) => {
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleComment = async () => {
     try {
       const res = await fetch(`/api/post/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, comment }),
      });
      const updatedPost = await res.json()
      dispatch(setPost({ Posts: updatedPost }));
      setComment("");
     } catch (error) {
      console.log(error)
     }
  }

  return (
    <div className="flex items-center px-6 rounded-full mt-4 bg-slate-50 w-full h-[60px] justify-between">
      <input type="text" placeholder="Comment On This Post..."
       onChange={(e) => setComment(e.target.value)}
       value={comment}
        className="w-full h-full bg-transparent rounded-full border-none outline-none"
      />
      <button onClick={handleComment} className="px-6 py-2 font-medium text-sm rounded-full bg-slate-700 text-white">
        Send
      </button>
    </div>
  )
}

export default CommentInput