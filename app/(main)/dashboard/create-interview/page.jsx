"use client"
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList'
import { toast } from 'sonner'
import InterviewLink from './_components/InterviewLink'
import { useUserDetail } from '@/app/provider'

const CreateInterview = () => {
  const router=useRouter();
  const [step,setStep]=useState(1);
  const [formData, setFormData]=useState();
  const [interviewId,setInterviewId]=useState();
  const [questionList, setQuestionList]=useState([]);
  const {user}=useUserDetail();
  const onHandleInput=(field,value)=>{
    setFormData(prev=>({
      ...prev,
      [field]:value
    }))

    console.log(formData);
  }

  const onGotoNext=()=>{
    if(user?.credits<=0){
      toast('Please Add Credits');
      return;
    }
    if(!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData.type){
      toast.error("Please fill all the fields");
      return;
    }else{
      setStep(step+1);
    }
  }

  const onCreateLink=(interview_id)=>{
    setInterviewId(interview_id);
    setStep(step+1);
  }

  return (
    <div className='mt-10 px-10 md:px-24 lg:px-4 xl:p-56'>
      <div className='flex gap-5 items-center'>
        <ArrowLeft onClick={()=>router.back()} className='cursor-pointer'/>
        <h2 className='font-bold text-2xl'>Create New Interview</h2>
      </div>

      <Progress value={step*33.33} className='my-5'/>
      {step==1?<FormContainer onHandleInput={onHandleInput}
      GotoNext={()=>onGotoNext()}/>:step==2?
      <QuestionList formData={formData} questionList={questionList} setQuestionList={setQuestionList} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/>
      :step==3?<InterviewLink interview_id={interviewId} formData={formData}/>:null}
    </div>
  )
}

export default CreateInterview