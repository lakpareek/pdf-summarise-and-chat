import { useState, useContext } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  //make a custom hook that closes menus etc when a click is made outside of them
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
