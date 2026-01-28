"use client"
import { useUserDetail } from '@/app/provider'
import Image from 'next/image';
import React from 'react'

const WelcomeContainer = () => {

    const {user}= useUserDetail();

  return (
    <div className='bg-white p-3 rounded-xl flex justify-between items-center shadow-md'>
        <div >
            <h2 className='text-lg font-bold'>Welcome Back, {user?.name || 'Guest'}!</h2>
            <h2 className='text-gray-500'>AI-Driven Interviews, Hassel-Free Hiring</h2>
        </div>
        {user && <Image src={user?.picture} alt='userAvatar' width={50} height={50} className='rounded-full'/>}
    </div>
  )
}

export default WelcomeContainer