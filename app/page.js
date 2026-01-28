import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='mt-10 ml-10'>
      <Image src={'/front.bmp'} alt='img' width="600" height="400"/>
      <Link href={'http://localhost:3000/auth'}><Button className='mt-3 text-xl bg-primary
       text-white w-xl rouded-xl'>Enter the AI Interview App</Button></Link>
    </div>
  )
}

export default page