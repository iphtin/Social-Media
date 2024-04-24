"use client"

import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import Loader from './Loading';
import { useSelector } from 'react-redux';

const UserProfile = () => {

  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if(user) setLoading(false)
  }, [user])


  return loading ? <Loader /> : (
    <div className="min-h-screen bg-white mr-3 rounded-md ">
      <div className="max-w-4xl mx-auto p-4">
        {/* Profile Header */}
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

        {/* Posts Grid (Placeholder) */}
        <div className="grid grid-cols-3 mt-8">
          {/* Replace with actual posts */}
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="relative aspect-w-1 aspect-h-1">
              <div className="bg-gray-200 rounded-md"></div>
            </div>
          ))}
        </div>
        <div className='divide-y'>
            <h2 className='font-bold pb-4'>Other Social Media</h2>
            <div className='flex justify-between items-center pt-2 space-x-2 cursor-pointer'>
             <div className='w-full flex items-center space-x-3'>
             <span className='bg-blue-500 text-white p-2 rounded-full'><Twitter /></span>
             <h2 className='font-bold text-sm'>Twitter</h2>
             </div>
             <div className='p-4'>
              <span className='bg-red-500 px-2 py-1 rounded-full text-white'>3</span>
             </div>
         </div>

         <div className='flex justify-between items-center pt-2 space-x-2 cursor-pointer'>
             <div className='w-full flex items-center space-x-3'>
             <span className='bg-blue-600 text-white p-2 rounded-full'><Facebook /></span>
             <h2 className='font-bold text-sm'>Facebook</h2>
             </div>
             <div className='p-4'>
              <span className='bg-red-500 px-2 py-1 rounded-full text-white'>2</span>
             </div>
         </div>

         <div className='flex justify-between items-center pt-2 space-x-2 cursor-pointer'>
             <div className='w-full flex items-center space-x-3'>
             <span className='bg-[#E74C3C] text-white p-2 rounded-full'><Instagram /></span>
             <h2 className='font-bold text-sm'>Instagram</h2>
             </div>
             <div className='p-4'>
              <span className='bg-red-500 px-2 py-1 rounded-full text-white'>2</span>
             </div>
         </div>
         </div>
      </div>
    </div>
  );
};

export default UserProfile;
