"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[])

  return (
    <div className='flex p-4 items-center justify-between  shadow-sm'>
        <Image src={'/logo.svg'} width={100} height={100} alt='logo' />
        
        <UserButton/>
    </div>
  )
}

export default Header