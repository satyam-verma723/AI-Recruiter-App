"use client"
import { useUserDetail } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidateList from './_components/CandidateList';

const InterviewDetail = () => {
  const {interview_id}=useParams();
  const {user}=useUserDetail();
  const [interviewDetail,setInterviewDetail]=useState();
  useEffect(()=>{
    user && GetInterviewDetail();
  },[user])

  const GetInterviewDetail=async()=>{
    const result=await supabase
         .from('interviews')
         .select('jobPosition,jobDescription,type,duration,questionList,interview_id,created_at,interviewFeedback(userName,userEmail,feedback,created_at)')
         .eq('userEmail',user?.email)
         .eq('interview_id',interview_id)
         .order('id',{ascending:false})

         console.log(result)
         setInterviewDetail(result?.data[0]);
  }
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-2xl'>Interview Detail</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail}/>
      <CandidateList candidateList={interviewDetail?.['interviewFeedback']}/>
    </div>
  )
}

export default InterviewDetail