"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { cn } from "@/lib/utils";
function Interview({params}) {

    const [interviewData,setInterviewData]=useState();
    const [webCamEnabled,setWebCamEnabled]=useState();
    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails();
    },[])

    /**
     * Used to Get Interview Details by MockId/Interview Id
     */
    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))

        setInterviewData(result[0]);
    }
  return (
    <div className='p-10'>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
       
            <div className='flex flex-col my-5 gap-5 '>
                <div 
                 className={cn('flex flex-col p-5 rounded-lg  gap-5',
                    "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
                  )}
                  style={{
                    backdropFilter: "blur(16px) saturate(180%)",
                    backgroundColor: "rgba(17, 25, 40, 0.75)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.125)",
                  }}>
                    <h2 className='text-lg'><strong>Job Role/Job Position:</strong>{interviewData?.jobPosition} </h2>
                    <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong>{interviewData?.jobDesc} </h2>
                    <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData?.jobExperience} </h2>
                </div>
                <div 
                className={cn('p-5 border rounded-lg ',
                    "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
                  )}
                  style={{
                    backdropFilter: "blur(16px) saturate(180%)",
                    backgroundColor: "rgba(17, 25, 40, 0.75)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.125)",
                  }}
                >
                   <h2 className='flex gap-2 items-center text-primary'> <Lightbulb/><strong>Information</strong></h2>
                    <h2 className='mt-3 text-primary'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                </div>
            </div>
            <div  className={cn('p-5  border rounded-lg ',
                    "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
                  )}
                  style={{
                    backdropFilter: "blur(16px) saturate(180%)",
                    backgroundColor: "rgba(17, 25, 40, 0.75)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.125)",
                  }}>
           {webCamEnabled? <Webcam 
           onUserMedia={()=>setWebCamEnabled(true)}
           onUserMediaError={()=>setWebCamEnabled(false)}
           mirrored={true}
            style={{
                height:600,
                width:600
            }}
           />
           :
           <>
            <WebcamIcon 
             className={cn('h-72 w-full my-7 p-20 rounded-lg border',
                "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
              )}
              style={{
                backdropFilter: "blur(16px) saturate(180%)",
                backgroundColor: "rgba(17, 25, 40, 0.75)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
              }} />
            <Button variant="ghost" className="w-full" onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
            </>
           }
            </div>

            
        </div>
        <div className='flex justify-end items-end'>
            <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
            <Button >Start Interview</Button>
            </Link>
           </div>

           
    </div>
  )
}

export default Interview