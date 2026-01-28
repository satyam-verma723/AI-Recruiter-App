import Image from 'next/image'
import React from 'react'

const InterviewHeader = () => {
  return (
    <div>
      <Image src={'/logo.png'} alt='logo' width={70} height={70}
      className='w-[70px] h-[70px]'/>
    </div>
  )
}

export default InterviewHeader