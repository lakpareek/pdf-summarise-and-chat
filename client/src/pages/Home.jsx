import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import QueryBox from '../components/QueryBox';
import Chat from '../components/Chat';

const Home = () => {
    return (
        <div>
              <Sidebar />
              <Dashboard />
              <QueryBox />
              <div className='flex justify-center w-screen'>
                <Chat/>
              </div>
            </div>
    );
};

export default Home;