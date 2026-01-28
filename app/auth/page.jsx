"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
const page = () => {
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/dashboard')
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  const signInWithGoogle = async() => {
    const {error}=await supabase.auth.signInWithOAuth({
      provider:'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if(error) console.log('Error: ', error.message)
  }
  return (
    <div>
        <div className='flex flex-col items-center justify-center h-screen mt-8'>
            <div className='flex flex-col items-center border rounded-2xl p-8'>
                <Image src={'/login.webp'} alt='login' width={300} height={300}
                className='w-[180px]' />
            </div>
            <div className="flex items-center flex-col">
                <h2 className='text-2xl font-bold text-center mt-5'>Welcome to AIcruiter</h2>
                <p className='text-gray-500 text-center'>Sign In With Google Authentication</p>
                <Button onClick={signInWithGoogle} className='mt-7'> Login with Google </Button>
            </div>
            
        </div>
    </div>
  )
}

export default page