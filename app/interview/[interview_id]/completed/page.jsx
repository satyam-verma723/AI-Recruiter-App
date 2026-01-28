import Image from 'next/image'
import React from 'react'

const InterviewComplete = () => {
  return (
    <div className='mt=10 ml-20'>
      <div>
        <Image src={'/check.png'} alt='check' width='200' height='200'/>
      </div>
      <h2 className='text-primary'>Your Interview has been completed</h2>
      <p className='text-gray-400'>Your Recruiter will contact you as per you recommendation</p>
    </div>
  )
}

export default InterviewComplete