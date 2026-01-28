import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Send } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/services/supabaseClient'

const InterviewCard = ({interview,viewDetail=false}) => {
    const [candidateCount, setCandidateCount] = useState(0);
    const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id;

    useEffect(() => {
        const getCandidateCount = async () => {
            const { count } = await supabase
                .from('interviewFeedback')
                .select('*', { count: 'exact', head: true })
                .eq('interview_id', interview?.interview_id);
            setCandidateCount(count || 0);
        };
        getCandidateCount();
    }, [interview?.interview_id]);

    const copyLink=()=>{
        navigator.clipboard.writeText(url);
        toast('Copied');
    }

const onSend=()=>{
    window.location.href="mailto:account@gmail.com?subject=AIrecrutiter Interview Link 7 body=Interview Link:"+url
}
  return (
    <div className='p-5 bg-white rounded-lg border '>
        <div className='flex items-center justify-between'>
            <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
            <h2 className='text-sm'>{moment(interview?.created_at).format('DD MM YYYY')}</h2>
        </div>
        <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
        <h2 className='mt-2 text-sm flex justify-between'>{interview?.duration}
            <span className='text-green-700'>{candidateCount} Candidates</span>
        </h2>
        {!viewDetail?<div className='flex gap-3 w-full mt-5'>
            <Button variant='outline' onClick={copyLink}><Copy/> Copy Link</Button>
            <Button variant='outline' onClick={onSend} className={'bg-blue-400 text-white'}><Send/> Send </Button>
        </div>
        :<Link href={'/scheduled-interview/'+interview?.interview_id+"/details"}>
        <Button variant='outline' className={'mt-3 w-full'}>View Detail<ArrowRight/></Button></Link>
        }
    </div>
  )
}

export default InterviewCard