import {Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CreateOptions = () => {
  return (
    <div className='grid grid-cols-2 gap-4 my-4 p-4 bg-secondry rounded-xl shadow-md'>
        <Link href={'/dashboard/create-interview'} className='bg-white border border-gray-200 rounded-lg p-5'>
            <Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
            <h2 className='font-bold'>Create New Interview</h2>
            <p className='text-gray-500'>Create AI Tnterviews and schedule them with candidate</p>
        </Link>
        <div className='bg-white border border-gray-200 rounded-lg p-5'>
            <Phone className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
            <h2 className='font-bold'>Create Phone Screening</h2>
            <p className='text-gray-500'>Create Phone Screening and schedule them with candidate</p>
        </div>
    </div>
  )
}

export default CreateOptions