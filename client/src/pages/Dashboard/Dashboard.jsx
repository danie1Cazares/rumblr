

import { useState, useEffect } from 'react';

// import styles from "./Dashboard.module.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import Container from "../../components/Container/Container";
import Sidebar from '../../components/Sidebar/Sidebar';
import FeedPanel from '../../components/FeedPanel/FeedPanel'
import CreatePostModal from '../../components/CreatePostModal/CreatePostModal';

import api from '../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';



export default function Dashboard() {

  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const res = await api.get('/users'); 
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }

    };

    fetchUser();

  }, []);

  if (!user) return <p>Loading...</p>;

  // CHECK LOGIN STATUS AND RETURN TO LOGIN PAGE IF NOT LOGGED IN
    if (!(localStorage.getItem('token'))) return <Navigate to="/" />;



  return (     
      <Wrapper modifier="dashboard">
                    <Sidebar  sidebarIsCollapsed={false} onCreatePostClick={()=>{setShowCreatePost(true)}}/>
                    <FeedPanel  />
                    {showCreatePost && <CreatePostModal onExitClick={()=>{setShowCreatePost(false)}}/>}

      </Wrapper>     
  );
}
