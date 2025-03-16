import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import QueryBox from "../components/QueryBox";
import Chat from "../components/Chat";

const Home = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!conversationId) {
  //     navigate("/");
  //   }
  // }, [conversationId, navigate]);

  return (
    <div>
      <Sidebar />
      <Dashboard />
      <QueryBox />
      {conversationId && (
        <div className="flex justify-center w-screen">
          <Chat conversationId={conversationId} />
        </div>
      )}
    </div>
  );
};

export default Home;
