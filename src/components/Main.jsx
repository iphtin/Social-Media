"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import Loader from './Loading';
import { useSelector, useDispatch } from 'react-redux'
import { setPosts } from "@features/posts/postsSlice"
import PostWidget from './PostWidget';
import AddPostWidge from './AddPostWidge';

const Main = () => {
  const [posts, setFetchPosts] = useState([]);
  const statePosts = useSelector((state) => state.Posts)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);

  // const { data: session } = useSession();
  // const user = session?.user;

  const fetchPosts = async () => {
    const posts = await fetch(`/api/users/${user._id}/friendsposts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await posts.json();
    dispatch(setPosts({ Posts: data }));
    setFetchPosts(data);
    setLoading(false)
  }

  useEffect(() => {
    if (user && statePosts) {
      fetchPosts();
    }
  }, [user])


  return loading ? <Loader /> : (
    <div className='w-full space-y-4'>
      {/* Upload Section */}
      <AddPostWidge />
      {/* Post Section */}
      {statePosts?.map(post => (
        <PostWidget
          postId={post._id}
          text={post.text}
          comments={post.comments}
          userPosted={post.userId}
          postImage={post.postImage}
          createdAt={post.createdAt}
          likes={post.likes}
          key={post._id}
        />
      ))}
    </div>
  )
}

export default Main