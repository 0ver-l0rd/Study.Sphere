import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
      {/* <Link href={"/dashboard"}><Image src={"/logo.png"} width={100} height={100} alt='hii'/></Link> */}
      <UserButton/>
    </div>
  )
}

export default Header
