"use client";

import FollowingWidget from '@components/FollowingWidget';
import Loader from '@components/Loading';
import PostWidget from '@components/PostWidget';
import { setPosts } from '@features/posts/postsSlice';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [posts, setStatePosts] = useState([]);
    const dispatch = useDispatch();
    const statePosts = useSelector((state) => state.Posts);

    console.log("Posts", user)

    const { userId } = useParams();

    const GetUser = async () => {
        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            setUser(data);

        } catch (error) {
            console.log(error)
        }
    }

    const getUserPosts = async () => {
        try {
            const res = await fetch(`/api/users/${userId}/userposts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            dispatch(setPosts({ Posts: data }));
            setStatePosts(data);
            setLoading(false);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetUser();
        getUserPosts();
    }, [])

    return loading ? <Loader /> : (
        <div className='w-[96%] max-md:block max-md:bg-red-500 max-md:w-full flex max-md:m-auto mt-4'>
            <div className='w-1/3 max-md:w-[90%] max-md:m-auto'>
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-32 h-32">
                        <img src={user?.profileImage} alt='ProfileImage' className="rounded-full w-[120px] h-[120px]" />
                    </div>
                    <div>
                        <div className="flex space-x-4">
                            <h1 className="text-2xl font-semibold">{user?.username}</h1>
                        </div>
                        <div className="mt-2">
                            <span className="text-gray-500">Followers: <span className='font-bold'>{user?.follow.length}</span></span>
                            <span className="mx-2 text-gray-500">Following: <span className='font-bold'>{user?.following.length}</span></span>
                        </div>
                        <p className="text-gray-500 mt-2">{`Hello, I am ${user?.username}`}</p>
                    </div>
                    <button className="px-4 w-full py-2 bg-[#111827] text-white rounded-md">Edit Profile</button>
                </div>
            </div>
            <div className='w-2/3 ml-4 p-2 max-md:w-[90%]'>
                {statePosts.length > 0 ? (
                    <div>
                        {statePosts.map(post => (
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
                ) : (
                    <div className='w-full h-[10vh] mt-4 flex justify-center'>
                        <h4 className='font-semibold text-gray-400'>No Post From {user?.username}</h4>
                    </div>
                )}

            </div>
            <div className='w-1/3'>
                <div className='w-full px-2'>
                    <h3 className='flex justify-between items-center px-4 mr-2 border-b pb-4 border-blue-500 font-bold'>
                        Following
                        <span className='text-orange-700'>{user?.following.length}</span>
                    </h3>
                    {user?.following.length > 0 ? (
                        <div className='space-y-2'>
                            {user?.following.map(friend => (
                                <FollowingWidget
                                    key={friend._id}
                                    userId={userId}
                                    friendId={friend._id}
                                    friend={user}
                                    friendsFollowingAndFollow={user?.following}
                                    username={friend.username}
                                    profileImage={friend.profileImage}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='w-full h-[10vh] mt-4 flex justify-center'>
                            <h4 className='font-semibold text-gray-400'>{user?.username} Did Not Follow Any One!</h4>
                        </div>
                    )}

                </div>

                <div className='w-full px-2 mt-4 max-md:hidden'>
                    <h3 className='flex justify-between px-4 ml-2 border-b pb-4 border-blue-500 font-bold'>
                        Followers
                        <span className='text-orange-700'>{user?.follow.length}</span>
                    </h3>
                    {user?.follow.length > 0 ? (
                        <div className='space-y-2'>
                            {user?.follow.map(friend => (
                                <FollowingWidget
                                    key={friend._id}
                                    userId={userId}
                                    friendId={friend._id}
                                    friend={friend}
                                    friendsFollowingAndFollow={user?.following}
                                    username={friend.username}
                                    profileImage={friend.profileImage}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='w-full h-[10vh] mt-4 flex justify-center'>
                            <h4 className='font-semibold text-gray-400'>{user?.username} Did Not Follow You Yet</h4>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default page