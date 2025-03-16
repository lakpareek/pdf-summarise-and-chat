import { useState, useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './components/Chat';
import { socket } from './socket';

function App() {
  //make a custom hook that closes menus etc when a click is made outside of them
  socket.on("connect", () => console.log("Connected:", socket.id));
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log(isConnected + " onconnect function")
      console.log("The socket is being connected")
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log(isConnected + " ondisconnected function")
      console.log("The socket is being disconnected")
    }
    

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      console.log('unmounting');
    };
  }, []);

  useEffect(() => {
    console.log("isConnected changed:", isConnected);
  }, [isConnected]);

  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/chat/:conversationId' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App