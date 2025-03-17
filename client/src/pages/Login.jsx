import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const api_url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [error, setError] = useState("");
  const log_in = async(e) =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if(email === '' || password === ''){
      setError("Please fill all the fields");
      return;
    }
    try {
      const response  = await axios.post(`${api_url}/auth/login`, {email, password}, { withCredentials: true });
      setUser(response.data.user);
      navigate('/')
    } catch (error) {
      setError(error.response?.data?.errorDetail || "Login failed. Please try again.");
    }
  }
  return (
    <div className='flex justify-center items-center h-screen w-screen flex-col'>
      <div className='bg-[#303030] lg:w-[30vw] lg:h-[30vw] justify-center md:w-[60vw] md:h-[80vw] w-[70vw] h-[90vw] flex flex-col items-center rounded-3xl'>
        <p className='md:text-2xl font-bold'>Welcome back!</p>
        <p className='font-thin text-xs'>Please login to continue</p>
        <form onSubmit={log_in} action="/login" method="POST" className='flex flex-col w-[80%] mt-[1vw]'>
          <input type="email" name="email" placeholder="Email" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]' />
          <input type="password" name="password" placeholder="Password" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]' />
          <button type="submit" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw]'>Login</button>
        </form>
        <button onClick={()=>{alert("OAuth 2.0 is still under developement. Try manual login")}} type="submit" className='p-[1vw] bg-[#404040] text-white rounded-md border-none mb-[1vw w-[80%] flex justify-center items-center gap-2'><FcGoogle />Log-in with Google</button>
        {error && <p className='text-red-400 text-sm pt-2'>{error}</p>}
      </div>
      <p>New User? <Link to='/signup' className='text-blue-500'>Sign-up</Link></p>
    </div>
  )
}
