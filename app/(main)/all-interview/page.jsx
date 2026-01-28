"use client"
import { useUserDetail } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Camera } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';


const AllInterview = () => {

    const [interviewList, setInterviewList] = useState([]);
    const {user}=useUserDetail();

    useEffect(()=>{
      user && GetInterviewList();
    },[user]);

    const GetInterviewList=async()=>{
      let{data:interviews,error}=await supabase
        .from('interviews')
        .select('*')
        .eq('userEmail',user?.email)
        .order('id',{ascending:false})
        console.log('interviewlist',interviews);
        setInterviewList(interviews);
    }
    
  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'>All Previously Created Interviews</h2>
        {interviewList?.length ==0 &&
             <div className='p-5 flex flex-col bg-white justify-center items-center gap-4 border-2 border-dashed border-gray-300 rounded-xl mt-5'>
                <Camera className='h-10 w-10 text-primary'/>
                <h2>You don't have any interview created !</h2>
                <Button> + Create New Interview</Button>
             </div>
        }
        {interviewList && 
          <div className='grid grid-cols-3 mt-5 gap-5'>
            {interviewList.map((interview,index)=>(
              // console.log(interview);
              <InterviewCard interview={interview} key={index} viewDetail={true}/>
            ))}
          </div>

        }
    </div>
  )
}

export default AllInterview