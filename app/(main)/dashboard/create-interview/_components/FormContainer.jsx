import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const FormContainer = ({onHandleInput,GotoNext}) => {
    const [interviewType,setInterviewType]=useState([]);
    useEffect(()=>{
        if(interviewType){
            onHandleInput('type',interviewType)
        }
    },[interviewType])

    const AddInterviewType=(type)=>{
        const data=interviewType.includes(type);
        if(!data){
            setInterviewType(prev=>[...prev,type])
        }else{
            const filteredTypes=interviewType.filter(item=>item!==type);
            setInterviewType(filteredTypes);
        }
    }
    return (
        <div className='p-5 bg-white'>
            <div>
                <h2 className='text-sm font-medium'>Job Position</h2>
                <Input placeholder="e.g. full stack developer" className='mt-2' 
                onChange={(event)=>onHandleInput('jobPosition',event.target.value)}/>
            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Job Description</h2>
                <Textarea placeholder='enter detailed job description' className='h-[200px] mt-2'
                onChange={(event)=>onHandleInput('jobDescription',event.target.value)} />
            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Interview Duration</h2>
                <Select onValueChange={(value)=>onHandleInput('duration',value)}>
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5 min">5 min</SelectItem>
                        <SelectItem value="15 min">15 min</SelectItem>
                        <SelectItem value="25 min">25 min</SelectItem>
                        <SelectItem value="35 min">35 min</SelectItem>
                        <SelectItem value="60 min">60 min</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Interview Type</h2>
                <div className='flex gap-3 flex-wrap mt-2'>
                    {InterviewType.map((type,index)=>(
                        <div key={index} className={`flex gap-2 p-1 px-2 items-center cursor-pointer hover:bg-secondary
                         bg-white border border-gray-100 rounded-2xl ${interviewType.includes(type.title)&&'bg-blue-50 text-primary'}`} onClick={()=>AddInterviewType(type.title)}>
                            <type.icon className='h-4 w-4'/>
                            <span>{type.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-7 flex justify-end' onClick={()=>GotoNext( )}>
                <Button> Generate Question <ArrowRight/></Button>
            </div>
        </div>
    )
}

export default FormContainer