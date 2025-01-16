import { useState, useContext } from 'react'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import QueryBox from './components/QueryBox'
import Chat from './components/Chat'

function App() {
  //make a custom hook that closes menus etc when a click is made outside of them
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <div>
      <Sidebar />
      <Dashboard />
      <QueryBox />
      <div className='flex justify-center w-screen'>
        <Chat/>
      </div>
    </div>
  )
}

export default App
