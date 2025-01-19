import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className='flex justify-center items-center h-screen w-screen flex-col'>
      <div className='bg-[#303030] lg:w-[30vw] lg:h-[30vw] justify-center md:w-[60vw] md:h-[80vw] w-[70vw] h-[90vw] flex flex-col items-center rounded-3xl'>
        <p className='md:text-2xl font-bold'>Welcome back!</p>
        <p className='font-thin text-xs'>Please login to continue</p>
        <form action="/login" method="POST" className='flex flex-col w-[80%] mt-[1vw]'>
          <input type="email" name="email" placeholder="Email" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]' />
          <input type="password" name="password" placeholder="Password" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]' />
          <button type="submit" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]'>Login</button>
        </form>
        <button type="submit" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw w-[80%] flex justify-center items-center gap-2'><FcGoogle />Log-in with Google</button>
        <p className='font-thin pt-1'>*invalid credentials</p>
      </div>
      <p>New User? <Link to='/signup' className='text-blue-500'>Sign-up</Link></p>
    </div>
  )
}
