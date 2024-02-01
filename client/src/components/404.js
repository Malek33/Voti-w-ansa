import React from 'react'
import { Link } from 'react-router-dom'

function P404() {
  return (
    <div className='w-screen h-screen flex justify-center flex-col items-center bg-gray-950'>
        <p className='text-9xl text-blue-600 font-bold'>404</p>
        <p className='text-white text-xl font-semibold'>page not found</p>
        <Link><p className='text-blue-600 underline hover:text-blue-500 text-lg font-semibold'>HomePage</p></Link>
    </div>
  )
}

export default P404