import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useUserDetail } from '@/app/provider';


const QuestionList = ({formData, questionList, setQuestionList, onCreateLink}) => {

    const [loading,setLoading]=useState(true);
    const {user}=useUserDetail();
    const [saveLoading, setSaveLoading]=useState(false);
    const hasGeneratedRef = useRef(false);
    const mountedRef = useRef(true);

    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(()=>{
        if(formData && formData.jobPosition && formData.jobDescription && formData.duration && formData.type){
            if(!hasGeneratedRef.current){
                hasGeneratedRef.current = true;
                GenerateQuestionList();
            }
        }
    },[formData])

    const GenerateQuestionList=async ()=>{
        setLoading(true);
        try{
            const result=await axios.post('/api/api-model',{
                ...formData
            });
            console.log(result.data.content);
            const Content = JSON.parse(result.data.content);
            setQuestionList(Content?.interviewQuestions || []);
            setLoading(false);
        }catch(e){
            if(e.response && e.response.status === 429){
                toast.error("Too many requests. Please wait a moment and try again.");
            }else{
                toast.error("Something went wrong");
            }
            hasGeneratedRef.current = false; // Reset to allow retry
            setLoading(false);
        }

    }

    const onFinish=async()=>{
        setSaveLoading(true);
        const interview_id= uuidv4();
        const { data, error } = await supabase
            .from('interviews')
            .insert([
                { 
                    ...formData,
                    questionList:questionList,
                    userEmail:user?.email,
                    interview_id:interview_id
                 },
            ])
            .select()
            //update user credit
            // const userUpadate=await supabase
            // .from('Users')
            // .update({credits:Number(user?.credits)-1})
            // .eq('email',user?.email)
            // .select()

            setSaveLoading(false);
            onCreateLink(interview_id);
    }
  return (
    <div>
        {loading && <div>
            <Loader2Icon className='animate-spin'/>
            <span className='mt-2'>Generating Questions...</span>
            <p> our ai is generating question based on your job description</p>
            </div>
        }
         {questionList?.length>0 &&
                 <div>
                    <QuestionListContainer questionList={questionList}/>
                 </div>
            }

            <div className='flex justify-end mt-10'>
                <Button onClick={()=>onFinish()} disabled={saveLoading}>
                    {saveLoading&&<Loader2 className='animate-spin'/>}
                    Create Interview Link and Finish</Button>
            </div>
    </div>
  )
}

export default QuestionList