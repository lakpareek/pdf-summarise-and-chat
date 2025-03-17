import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { axiosInstance } from '../axios';

export default function Signup() {
  const api_url = import.meta.env.VITE_API_URL;
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const sign_up = async(e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const fullname = e.target.fullname.value;
    const password = e.target.password.value;
    if(email === '' || fullname === '' || password === ''){
      setError("Please fill all the fields");
      return;
    }
    try {
      const response = await axiosInstance.post('/auth/signup', { email, fullname, password });
      setUser(response.data.user);
      navigate('/')
    } catch (error) {
      setError(error.response?.data?.errorDetail || "Signup failed. Please try again.");
    }
  }

  return (
    <div className='flex justify-center items-center h-screen w-screen flex-col'>
          <div className='bg-[#303030] lg:w-[30vw] lg:h-[30vw] justify-center md:w-[60vw] md:h-[80vw] w-[70vw] h-[90vw] flex flex-col items-center rounded-3xl'>
            <p className='md:text-2xl font-bold'>Welcome!</p>
            <p className='font-thin text-xs'>Please sign-up to continue</p>
            <form onSubmit={sign_up} action="/login" method="POST" className='flex flex-col w-[80%] mt-[1vw]'>
              <input type="email" name="email" placeholder="Email" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]' />
              <input type="text" name="fullname" placeholder="Your Name" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]' />
              <input type="password" name="password" placeholder="Password" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]' />
              <button type="submit" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]'>Sign-up</button>
            </form>
            <button onClick={()=>{alert("OAuth 2.0 is still under developement. Try manual signup")}} type="submit" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw w-[80%] flex justify-center items-center gap-2'><FcGoogle />Sign-up with Google</button>
            {error && <p className='text-red-400 text-sm pt-2'>{error}</p>}
          </div>
          <p>Already a User? <Link to='/login' className='text-blue-500'>Login</Link></p>
        </div>
  )
}
