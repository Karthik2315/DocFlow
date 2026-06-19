import React from 'react'
import Link from 'next/link'

const Home = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Link href="/documents/2315">Go to Documents</Link>
    </div>
  )
}

export default Home
