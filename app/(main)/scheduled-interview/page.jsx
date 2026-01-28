"use client"
import { useUserDetail } from '@/app/provider'
import { supabase } from '@/services/supabaseClient'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard'
import { Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ScheduledInterview = () => {

    const {user}=useUserDetail();
    const [interviewList,setInterviewList]=useState();
    useEffect(()=>{
        user && GetInterviewList();
    },[user])

    const GetInterviewList=async()=>{
        const result=await supabase
         .from('interviews')
         .select('jobPosition,duration,interview_id,interviewFeedback(userEmail,feedback)')
         .eq('userEmail',user?.email)
         .order('id',{ascending:false})

         console.log(result)
         setInterviewList(result.data);
    }
  return (
    <div>
        <h2 className='font-bold text-xl'>Interview List with Candidate Feedback</h2>
        {interviewList?.length ==0 &&
             <div className='p-5 flex flex-col bg-white justify-center items-center gap-4 border-2 border-dashed border-gray-300 rounded-xl mt-5'>
                <Camera className='h-10 w-10 text-primary'/>
                <h2>You don't have any interview created !</h2>
                <Button> + Create New Interview</Button>
             </div>
        }
        {interviewList && 
          <div className='grid grid-cols-3 mt-5 gap-5'>
            {interviewList?.map((interview,index)=>(
              <InterviewCard interview={interview} key={index} viewDetail={true}/>
            ))}
          </div>

        }
    </div>
  )
}

export default ScheduledInterview