

import { useState } from 'react';

// import styles from "./Messages.module.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import Sidebar from '../../components/Sidebar/Sidebar';
import MessagePanel from '../../components/MessagePanel/MessagePanel';

import api from '../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ChatPanel from '../../components/ChatPanel/ChatPanel';
import CreatePostModal from '../../components/CreatePostModal/CreatePostModal';


export default function MessagesPage() {

  // CHECK LOGIN STATUS AND RETURN TO PROFILE PAGE IF LOGGED IN
  // if (localStorage.getItem('token')) return <Navigate to="/profile" />;

  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
     
      <Wrapper modifier="dashboard">
                    <Sidebar  sidebarIsCollapsed={true} preventNavExpansion={true} onCreatePostClick={()=>{setShowCreatePost(true)}} />
      
                    <MessagePanel />
                    <ChatPanel/>
                    {showCreatePost && <CreatePostModal onExitClick={()=>{setShowCreatePost(false)}}/>}
                    
      </Wrapper>     
  );
}
