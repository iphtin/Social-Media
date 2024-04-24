"use client"

import { AlignJustify, Bell, CircleUser, ExternalLink, Home, Menu, MessageCircleMore, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux';
import { Diversity1Rounded } from '@mui/icons-material';


{/* <div className='flex max-md:hidden items-center space-x-2 pr-8'>
        <img src={user?.profileImage || "https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg"} alt='ProfileImage'
          className='w-8 h-8 rounded-full' />
        <button onClick={handleLogout} className='border-1 px-6 py-2 rounded-full cursor-pointer border-black font-semibold bg-red-500 text-white'>
          Sign Out
        </button>
      </div> */}

const Topbar = () => {

  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user) setLoading(false)
  }, [user])

  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  }

  return loading ? null : (
    <div className='flex justify-between items-center w-full h-[80px]'>
      <div className='flex space-x-8 items-center max-md:hidden'>
        <Link href={"/home"} className='flex items-center pl-6'>
          <img src="/assets/logo.png" alt="logo" className="w-16 h-16 mr-2" />
          <h2 className="font-bold text-lg">Friend<span className='text-blue-500'>-zone</span></h2>
        </Link>
        <Link href={"/home"} className='flex items-center space-x-2 cursor-pointer'>
          <span className='text-blue-500'> <Home /></span>
          <h2 className='font-semibold text-sm'>Homepage</h2>
        </Link>
        <Link href={"/contacts"} className='flex items-center space-x-2 cursor-pointer'>
          <span className='text-blue-500'><Users /></span>
          <h2 className='font-semibold text-sm'>Connections</h2>
        </Link>
        {/* <div className='flex items-center space-x-2 cursor-pointer'>
          <span className='text-blue-500'><MessageCircleMore /></span>
          <h2 className='font-semibold text-sm'>Messages</h2>
        </div>
        <div className='flex items-center space-x-2 cursor-pointer'>
          <span className='text-blue-500'><Bell /></span>
          <h2 className='font-semibold text-sm flex items-center'>
            Notifications <span className='bg-red-500 text-white ml-2 px-2 rounded-full'>2</span>
          </h2>
        </div> */}
        <Link href={"/profile"} className='flex items-center space-x-2 cursor-pointer'>
          <span className='text-blue-500'><CircleUser /></span>
          <h2 className='font-semibold text-sm'>Profile</h2>
        </Link>
      </div>
      <span className='hidden items-center px-4 w-full justify-between max-md:flex'>
        <Link href={"/home"} className='flex items-center pl-6'>
          <img src="/assets/logo.png" alt="logo" className="w-16 h-16 mr-2" />
          <h2 className="font-bold text-lg">Friend<span className='text-blue-500'>-zone</span></h2>
        </Link>
        <div className='text-[30px]' onClick={() => setIsMenuOpen(true)}>
          <Menu />
        </div>
      </span>

      {isMenuOpen && (
        <div className='w-full hidden max-md:block h-[100vh] fixed top-0 z-40 left-0 bg-white'>
        <div className='w-full items-center'>
          <div className='items-center space-y-6 ml-6'>
            <div className='flex items-center justify-between px-6'>
              <Link href={"/home"} className='flex items-center w-full'>
              <img src="/assets/logo.png" alt="logo" className="w-16 h-16 mr-2" />
              <h2 className="font-bold text-lg">Friend<span className='text-blue-500'>-zone</span></h2>
              </Link>
              <span onClick={() => setIsMenuOpen(false)} className='font-bold text-[30px] text-red-600'>X</span>
            </div>
            <Link href={"/contacts"} className='flex items-center space-x-2 cursor-pointer'>
              <span className='text-blue-500'><Users /></span>
              <h2 className='font-semibold text-sm'>Connections</h2>
         </Link>
        <Link href={"/profile"} className='flex items-center space-x-2 cursor-pointer'>
        <span className='text-blue-500'><CircleUser /></span>
         <h2 className='font-semibold text-sm'>Profile</h2> 
        </Link>
        </div>
         </div>
         <div className='flex items-center space-x-2 p-4'>
        <img src={user?.profileImage || "https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg"} alt='ProfileImage'
          className='w-8 h-8 rounded-full' />
        <button onClick={handleLogout} className='border-1 px-6 py-2 rounded-full cursor-pointer border-black font-semibold bg-red-500 text-white'>
          Sign Out
        </button>
      </div>
         </div>
      )}

    <div className='flex max-md:hidden items-center space-x-2 p-4'>
        <img src={user?.profileImage || "https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg"} alt='ProfileImage'
          className='w-8 h-8 rounded-full' />
        <button onClick={handleLogout} className='border-1 px-6 py-2 rounded-full cursor-pointer border-black font-semibold bg-red-500 text-white'>
          Sign Out
        </button>
      </div>

    </div>
  )
}

export default Topbar