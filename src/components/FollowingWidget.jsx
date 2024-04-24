"use client"

import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '@features/posts/postsSlice';
import Link from 'next/link';

const FollowingWidget = ({ friendId, userId, friendsFollowingAndFollow, friend, username, profileImage}) => {
    const dispatch = useDispatch();
    const isFriend = friendsFollowingAndFollow.find((friend) => friend._id === friendId);
    console.log("isFriend", isFriend)

    const handleFollow = async (friend) => {
        const res = await fetch(`api/users/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friend._id),
        });

        if (res.ok) {
            dispatch(setFriends({ following: friend }));
        }

    };

    return (
        <div className='w-full bg-white'>
            <div className='flex items-center justify-between p-2'>
                <Link href={`/profile/${friendId}`} className='flex items-center space-x-2'>
                    <img src={profileImage} alt="profileImage"
                        className='w-12 h-12 rounded-full'
                    />
                    <h2 className='font-medium'>{username}</h2>
                </Link>
                <div className='mr-4'>
                    <button
                        onClick={() => handleFollow(friend)}
                        className="bg-black px-4 py-2 text-white rounded-full font-medium cursor-pointer"
                    >
                        {isFriend ? 'Following' : 'Follow'}
                       
                    </button>
                </div>
            </div>
        </div>

    )
}

export default FollowingWidget