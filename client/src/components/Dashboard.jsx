import React from 'react'
import Navbar from './Navbar'
import { useContext } from 'react';
import { SidebarToggleContext } from '../context/SidebarToggleContext'

export default function Dashboard() {
  const { sidebarToggle, setSidebarToggle } = useContext(SidebarToggleContext);
  return (
    <div className='w-screen'>
      <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
    </div>
  )
}
