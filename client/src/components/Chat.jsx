import React from 'react'
import Message from './Message'

export default function Chat() {
  return (
    <div className='overflow-scroll h-[70.9vh] w-screen flex flex-col items-center pt-2 '>
      <div className='w-[48vw]'>
      <Message/>
      </div>
    </div>
  )
}
