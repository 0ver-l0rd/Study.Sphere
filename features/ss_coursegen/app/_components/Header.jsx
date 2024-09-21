'use client'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  const {user} = useUser()
  return (
    <div className='flex justify-between p-5 shadow-sm'>
    <Link href={`${process.env.NEXT_PUBLIC_HOST_NAME}/dashboard`}><Image src="/logo.png" width={150} height={100} className='cursor-pointer'/></Link>
      {user ? <UserButton/> :<Link href={"/dashboard"}><Button>Get Started</Button></Link>}
    </div>
  )
}

export default Header
