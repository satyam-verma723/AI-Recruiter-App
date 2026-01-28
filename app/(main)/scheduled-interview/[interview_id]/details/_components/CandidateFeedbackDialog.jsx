import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const CandidateFeedbackDialog = ({ candidate }) => {
    const feedback=candidate?.feedback?.feedback;
    return (
        <Dialog>
            <DialogTrigger asChild><Button variant='outline' className='text-primary'>View Report</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <div className='p-5 flex gap-3 items-center justify-between bg-white rounded-lg bg-white'>
                                <div className='flex items-center gap-5'>
                                    <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full'>{candidate.userName[0]}</h2>
                                    <div>
                                        <h2 className='font-bold'>{candidate?.userName}</h2>
                                        <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <h2 className='text-primary text-2xl font-bold'>6/10</h2>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <h2 className='font-bold'>Skills Assessment</h2>
                                <div className='mt-3 grid grid-cols-2 gap-10'>
                                    <div>
                                        <h2 className='flex justify-between'>Technical skills <span>{feedback?.rating?.technicalskills}/10</span></h2>
                                        <Progress value={feedback?.rating?.technicalskills*10} className='mt-1'/>
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Communication<span>{feedback?.rating?.communication}/10</span></h2>
                                        <Progress value={feedback?.rating?.communication*10} className='mt-1'/>
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Problem-Solving<span>{feedback?.rating?.problemSolving}/10</span></h2>
                                        <Progress value={feedback?.rating?.problemSolving*10} className='mt-1'/>
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Experience<span>{feedback?.rating?.experience}/10</span></h2>
                                        <Progress value={feedback?.rating?.experience*10} className='mt-1'/>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <h2 className='font-bold'>Performance Summary</h2>
                                    <p>{feedback?.summary}</p>
                                </div>
                                <div className={`mt-5 p-5 flex items-center justify-between rounded-md ${feedback.Recommendation=='No'?'bg-red-100':'bg-green-100'}`}>
                                    <div>
                                    <h2 className={` font-bold ${feedback.Recommendation=='No'?'text-red-700':'text-green-700'}`}>Recommendation Msg:</h2>
                                    <p className={`${feedback.Recommendation=='No'?'text-red-500':'text-green-500'}`}>{feedback?.Recommendation}</p>
                                    </div>
                                    <Button className={`${feedback.Recommendation=='No'?'bg-red-700':'bg-green-700'}`}>Send Msg</Button>
                                </div>
                            </div>
                            </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CandidateFeedbackDialog