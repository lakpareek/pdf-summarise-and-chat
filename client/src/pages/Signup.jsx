import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';


export default function Signup() {
  return (
    <div className='flex justify-center items-center h-screen w-screen flex-col'>
          <div className='bg-[#303030] lg:w-[30vw] lg:h-[30vw] justify-center md:w-[60vw] md:h-[80vw] w-[70vw] h-[90vw] flex flex-col items-center rounded-3xl'>
            <p className='md:text-2xl font-bold'>Welcome!</p>
            <p className='font-thin text-xs'>Please sign-up to continue</p>
            <form action="/login" method="POST" className='flex flex-col w-[80%] mt-[1vw]'>
              <input type="email" name="email" placeholder="Email" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]' />
              <input type="password" name="password" placeholder="Password" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]' />
              <button type="submit" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]'>Sign-up</button>
            </form>
            <button type="submit" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw w-[80%] flex justify-center items-center gap-2'><FcGoogle />Sign-up with Google</button>
            <p className='font-thin pt-1'>*invalid credentials</p>
          </div>
          <p>Already a User? <Link to='/login' className='text-blue-500'>Login</Link></p>
        </div>
  )
}
