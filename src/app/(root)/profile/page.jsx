"use client";

import FollowingWidget from '@components/FollowingWidget';
import Loader from '@components/Loading';
import PostWidget from '@components/PostWidget';
import UserProfile from '@components/UserWidget';
import { setPosts } from '@features/posts/postsSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const following = useSelector((state) => state.user?.following) || [];
    const followers = useSelector((state) => state.user?.follow) || [];
    const posts = useSelector((state) => state.Posts) || [];
    const [fetchposts, setFetchPosts] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    console.log(fetchposts)

    const [activeTab, setActiveTab] = useState('posts');

    const fetchPosts = async () => {
        const posts = await fetch(`/api/users/${user._id}/userposts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        const data = await posts.json();
        console.log("DataFromProfilePost", data)
        dispatch(setPosts({ Posts: data }));
        setFetchPosts(data);
      }
    
      useEffect(() => {
        if (user) {
          fetchPosts();
          setLoading(false)
        }
      }, [user])

    return loading ? <Loader /> : (
        <div className='flex w-[90%] m-auto max-md:block max-md:w-full'>
            <div className='w-1/3 max-lg:w-1/2 max-md:w-full'>
                <UserProfile />
            </div>
            <div className='w-2/3 flex max-lg:w-1/2 max-md-full max-md:bg-red-500'>
                <div className='w-full'>
                    <div className='flex justify-between mb-4'>
                    <button
                            className={`btn-tab ${activeTab === 'posts' ? 'active' : ''}`}
                            onClick={() => setActiveTab('posts')}
                        >
                            Posts ({posts.length})
                        </button>
                      
                        <button
                            className={`btn-tab ${activeTab === 'following' ? 'active' : ''}`}
                            onClick={() => setActiveTab('following')}
                        >
                            Following ({following.length})
                        </button>

                        <button
                            className={`btn-tab ${activeTab === 'followers' ? 'active' : ''}`}
                            onClick={() => setActiveTab('followers')}
                        >
                            Followers ({followers.length})
                        </button>
                    
                    </div>
                    <div className='tab-content'>
                        {activeTab === 'followers' && (
                            <>
                                {followers.length > 0 ? (
                                    <div className='space-y-4'>
                                        {followers.map(friend => (
                                            <FollowingWidget
                                                key={friend._id}
                                                friendId={friend._id}
                                                friend={friend}
                                                friendsFollowingAndFollow={following}
                                                username={friend.username}
                                                profileImage={friend.profileImage}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className='w-full h-[10vh] mt-4 flex justify-center'>
                                        <h4 className='font-semibold text-gray-400'>No followers yet</h4>
                                    </div>
                                )}
                            </>
                        )}
                        {activeTab === 'following' && (
                            <>
                                {following.length > 0 ? (
                                    <div className='space-y-4'>
                                        {following.map(friend => (
                                            <FollowingWidget
                                                key={friend._id}
                                                friendId={friend._id}
                                                friend={friend}
                                                friendsFollowingAndFollow={following}
                                                username={friend.username}
                                                profileImage={friend.profileImage}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className='w-full h-[10vh] mt-4 flex justify-center'>
                                        <h4 className='font-semibold text-gray-400'>Not following anyone</h4>
                                    </div>
                                )}
                            </>
                        )}
                        {activeTab === 'posts' && (
                            <>
                                {posts.map(post => (
                                    <div key={post._id} className='space-y-2'>
                                        {posts.map(post => (
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
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
