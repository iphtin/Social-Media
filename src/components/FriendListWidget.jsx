"use client"

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import FollowingWidget from './FollowingWidget';
import { SearchCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

const FriendListWidget = () => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { _id } = useSelector((state) => state.user);
    const friendsFollowingAndFollow = useSelector((state) => state.user?.following) || [];

    const { data: session } = useSession();
    const user = session?.user;

    const getUsers = async () => {
        try {
            const res = await fetch("api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();

            const SliceCurrentUser = data.filter(data => data._id !== user.id);

            setUsers(SliceCurrentUser)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user && users) {
            getUsers();
            setLoading(false)
        }
    }, [user])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return loading ? null : (
    <div className='w-full'>
    <h2 className='font-semibold ml-2 text-lg text-blue-500'>Add New Users To Be Your Friend</h2>
    <div className='border border-blue-400 rounded-md p-2 mt-4'>
        <div className='w-full flex items-center p-4 h-[40px] rounded-full bg-white'>
            <input type="text" placeholder='Search...'
                value={searchTerm}
                onChange={handleSearchChange}
                className='w-full text-sm  px-2 outline-none border-none bg-transparent'
            />
            <button className='text-[18px] text-blue-500'><SearchCheck /></button>
        </div>
    </div>
    <div className='space-y-2'>
    {filteredUsers.map(friend => (
        <FollowingWidget 
            key={friend._id}
            userId={_id}
            friendId={friend._id}
            friend={friend}
            friendsFollowingAndFollow={friendsFollowingAndFollow}
            username={friend.username}
            profileImage={friend.profileImage}
         />
    ))}
    </div>
  </div>
  )
}

export default FriendListWidget