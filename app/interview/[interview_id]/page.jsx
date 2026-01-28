"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { useRouter } from 'next/navigation'

const Interview = () => {

  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail,setUserEmail]=useState();
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router=useRouter();
  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from('interviews')
        .select("jobPosition,jobDescription,duration,type,questionList")
        .eq('interview_id', interview_id)

      setInterviewData(Interviews[0]);
      setLoading(false);
      if (!Interviews || Interviews.length === 0) {
        toast("Incorrect Interview Link");
        return;
      }
    } catch (err) {
      toast("Incorrect Interview Link");
      setLoading(false);
    }
  }

  const onJoinInterview = async() => {
    setLoading(true);
    setInterviewInfo({
      userName:userName,
      userEmail:userEmail,
      InterviewData:interviewData
    });
    router.push('/interview/'+interview_id+'/start');
    setLoading(false);
  }

  return (
    <div className="flex justify-center">
      <div className="w-full px-6 md:px-20 lg:px-40 xl:px-60 mt-6">

        {/* Card */}
        <div className="flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-32 xl:px-48">
          <Image
            src="/logo.png"
            alt="interview"
            width={70}
            height={70}
          />

          <h2 className="mt-2 font-semibold text-lg">
            AI-Powered Interview Platform
          </h2>

          <Image
            src="/interview.png"
            alt="interview"
            width={100}
            height={100}
            className="my-6"
          />
        </div>

        {/* Title */}
        <h2 className="font-bold text-lg mt-6">
          {interviewData?.jobPosition}
        </h2>

        {/* Duration */}
        <h2 className="flex gap-2 items-center text-gray-500 mt-1">
          <Clock className="w-4 h-4" />
          {interviewData?.duration} Minutes
        </h2>

        {/* Name Input */}
        <div className="mt-6">
          <h2 className="font-bold mb-1">Enter your full name</h2>
          <Input placeholder="Full Name" onChange={(event)=>setUserName(event.target.value)} />
        </div>
        <div className="mt-6">
          <h2 className="font-bold mb-1">Enter your Email</h2>
          <Input placeholder="john@gmail.com" onChange={(event)=>setUserEmail(event.target.value)} />
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-100 flex gap-3 rounded-lg">
          <Info className="mt-1 text-primary" />
          <div>
            <h2 className="font-bold">Before you begin</h2>
            <ul className="list-disc list-inside text-sm text-primary mt-1">
              <li>Test your camera and microphone</li>
              <li>Ensure you have a stable internet connection</li>
              <li>Find a quiet place for the interview</li>
            </ul>
          </div>
        </div>

        {/* Start Button */}
        <Button className="w-full mt-6 mb-10 font-bold flex items-center 
        justify-center gap-2" disabled={loading||userName.length==0} onClick={()=>onJoinInterview(userName, interview_id)}>
          <Video className="w-4 h-4" /> {loading && <Loader2Icon/>}
          Start Interview
        </Button>
      </div>
    </div>
  )
}

export default Interview
