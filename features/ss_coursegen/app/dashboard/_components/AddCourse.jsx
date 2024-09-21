'use client'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useContext } from 'react'

function AddCourse() {
    const {user} = useUser()
    const {userCourseList,setUserCourseList} = useContext(UserCourseListContext)

  return (
    <div className='flex md:items-center md:justify-between flex-col md:flex-row items-start gap-5'>
      <div>
        <h2 className='text-3xl'>Hello, <span className='font-bold'>{user?.fullName}</span></h2>
        <p className='text-sm text-gray-500'>Create new course with AI, Share with friends and Earn from it.</p>
      </div>
      <Link href={'/create-course'}>
      
      <Button>+ Create AI Course</Button>
      </Link>
    </div>
  )
}

export default AddCourse
