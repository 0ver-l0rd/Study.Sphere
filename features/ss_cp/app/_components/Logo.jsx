import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={'/dashboard'} className='flex items-center gap-2'>
        <Image src={'/logo.svg'} alt='logo'
        width={100} height={100} />
        <h2 className='font-bold text-xl'></h2>
    </Link>
  )
}

export default Logo